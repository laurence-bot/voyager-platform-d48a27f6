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
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

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

export function initializeGoogleAds() {
  if (typeof window === "undefined" || !hasMarketingConsent()) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  window.gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);

  if (!document.querySelector(`script[data-google-ads-id="${GOOGLE_ADS_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    script.dataset.googleAdsId = GOOGLE_ADS_ID;
    document.head.appendChild(script);
  }
}

export function denyGoogleAdsConsent() {
  window.gtag?.("consent", "update", { ad_storage: "denied", ad_user_data: "denied" });
}

export function recordGoogleAdsConversion(submissionId: string) {
  if (!hasMarketingConsent() || !window.gtag) return false;
  const dedupeKey = `la-voyagerie-google-ads-conversion:${submissionId}`;
  if (window.sessionStorage.getItem(dedupeKey)) return false;
  window.sessionStorage.setItem(dedupeKey, new Date().toISOString());
  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSION,
    transaction_id: submissionId,
  });
  return true;
}
