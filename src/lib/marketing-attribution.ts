export const GOOGLE_ADS_ID = "AW-10861239904";
export const GOOGLE_ADS_CONVERSION = "AW-10861239904/Fi4ACJbPq6YDEOC8hbso";

const ATTRIBUTION_KEY = "la-voyagerie-attribution-v1";
const CONSENT_KEY = "la-voyagerie-cookie-consent";
const ATTRIBUTION_FIELDS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type MarketingAttribution = Partial<Record<(typeof ATTRIBUTION_FIELDS)[number], string>> & {
  landing_url?: string;
  referrer?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<IArguments | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_SCRIPT_SELECTOR = `script[data-google-ads-id="${GOOGLE_ADS_ID}"]`;
const PENDING_CONVERSION_KEY = "la-voyagerie-pending-google-ads-conversion";
const SCRIPT_LOAD_TIMEOUT_MS = 10_000;

let googleAdsReadyPromise: Promise<boolean> | null = null;
let googleAdsConfigured = false;
const conversionsInFlight = new Map<string, Promise<boolean>>();

function trim(value: string | null, max: number) {
  return value?.trim().slice(0, max) || "";
}

export function captureMarketingAttribution(): MarketingAttribution {
  if (typeof window === "undefined") return {};
  try {
    const query = new URLSearchParams(window.location.search);
    const current: MarketingAttribution = {};
    for (const field of ATTRIBUTION_FIELDS) {
      const value = trim(
        query.get(field),
        field.includes("clid") || field.includes("braid") ? 256 : 300,
      );
      if (value) current[field] = value;
    }
    const storedRaw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    const stored = storedRaw ? (JSON.parse(storedRaw) as MarketingAttribution) : null;
    const hasCurrentCampaign = ATTRIBUTION_FIELDS.some((field) => Boolean(current[field]));
    if (stored && !hasCurrentCampaign) return stored;

    const attribution: MarketingAttribution = {
      ...(stored || {}),
      ...current,
      landing_url: trim(window.location.href, 2048),
      referrer: trim(document.referrer, 2048),
    };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return {};
  }
}

export function hasMarketingConsent() {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const consent = JSON.parse(raw) as {
      marketing?: boolean;
      necessary?: boolean;
      version?: number;
      expiresAt?: string;
    };
    return (
      consent.version === 1 &&
      consent.necessary === true &&
      consent.marketing === true &&
      new Date(consent.expiresAt || "").getTime() > Date.now()
    );
  } catch {
    return false;
  }
}

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google requires the native arguments object so gtag.js can consume the queue verbatim.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
}

function loadGoogleAdsScript() {
  const existing = document.querySelector<HTMLScriptElement>(GOOGLE_ADS_SCRIPT_SELECTOR);
  if (existing?.dataset.googleAdsLoaded === "true") return Promise.resolve(true);

  return new Promise<boolean>((resolve) => {
    const script = existing || document.createElement("script");
    let settled = false;

    const finish = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      if (loaded) script.dataset.googleAdsLoaded = "true";
      resolve(loaded);
    };

    const timeoutId = window.setTimeout(() => finish(false), SCRIPT_LOAD_TIMEOUT_MS);
    script.addEventListener("load", () => finish(true), { once: true });
    script.addEventListener("error", () => finish(false), { once: true });

    if (!existing) {
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
      script.dataset.googleAdsId = GOOGLE_ADS_ID;
      document.head.appendChild(script);
    }
  });
}

export function initializeGoogleAds(): Promise<boolean> {
  if (typeof window === "undefined" || !hasMarketingConsent()) return Promise.resolve(false);
  ensureGtagQueue();
  window.gtag?.("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  if (googleAdsConfigured) return Promise.resolve(true);
  if (googleAdsReadyPromise) return googleAdsReadyPromise;

  googleAdsReadyPromise = loadGoogleAdsScript().then((loaded) => {
    if (!loaded || !hasMarketingConsent() || !window.gtag) {
      googleAdsReadyPromise = null;
      return false;
    }

    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_ADS_ID);
    googleAdsConfigured = true;
    return true;
  });

  return googleAdsReadyPromise;
}

export function denyGoogleAdsConsent() {
  if (typeof window === "undefined") return;
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export async function recordGoogleAdsConversion(submissionId: string): Promise<boolean> {
  if (typeof window === "undefined" || !submissionId) return false;
  const dedupeKey = `la-voyagerie-google-ads-conversion:${submissionId}`;
  if (window.sessionStorage.getItem(dedupeKey)) return false;
  const existing = conversionsInFlight.get(submissionId);
  if (existing) return existing;

  window.sessionStorage.setItem(PENDING_CONVERSION_KEY, submissionId);
  if (!hasMarketingConsent()) return false;

  const conversion = (async () => {
    const ready = await initializeGoogleAds();
    if (!ready || !hasMarketingConsent() || !window.gtag) return false;
    if (window.sessionStorage.getItem(dedupeKey)) return false;

    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION,
      transaction_id: submissionId,
    });
    window.sessionStorage.setItem(dedupeKey, new Date().toISOString());
    if (window.sessionStorage.getItem(PENDING_CONVERSION_KEY) === submissionId) {
      window.sessionStorage.removeItem(PENDING_CONVERSION_KEY);
    }
    return true;
  })().finally(() => conversionsInFlight.delete(submissionId));

  conversionsInFlight.set(submissionId, conversion);
  return conversion;
}

async function replayPendingGoogleAdsConversion() {
  const submissionId = window.sessionStorage.getItem(PENDING_CONVERSION_KEY);
  if (submissionId) await recordGoogleAdsConversion(submissionId);
}

export function startGoogleAdsTracking() {
  if (typeof window === "undefined") return () => undefined;

  const applyConsent = (marketing: boolean) => {
    if (!marketing) {
      denyGoogleAdsConsent();
      return;
    }
    void initializeGoogleAds().then((ready) => {
      if (ready) void replayPendingGoogleAdsConversion();
    });
  };

  const onConsent = (event: Event) => {
    const preferences = (event as CustomEvent<{ marketing?: boolean }>).detail;
    applyConsent(preferences?.marketing === true);
  };

  applyConsent(hasMarketingConsent());
  window.addEventListener("la-voyagerie:consent", onConsent);
  return () => window.removeEventListener("la-voyagerie:consent", onConsent);
}
