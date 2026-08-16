import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "la-voyagerie-cookie-consent";
const CONSENT_VERSION = 1;
const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

export type CookieConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
  expiresAt: string;
  version: number;
};

declare global {
  interface Window {
    __LA_VOYAGERIE_CONSENT__?: CookieConsentPreferences;
  }
}

function readConsent(): CookieConsentPreferences | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    const consent = JSON.parse(raw) as CookieConsentPreferences;
    const isValid =
      consent.version === CONSENT_VERSION &&
      consent.necessary === true &&
      new Date(consent.expiresAt).getTime() > Date.now();

    if (!isValid) {
      window.localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    return consent;
  } catch {
    window.localStorage.removeItem(CONSENT_KEY);
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const savedAt = new Date();
  const consent: CookieConsentPreferences = {
    necessary: true,
    analytics,
    marketing,
    savedAt: savedAt.toISOString(),
    expiresAt: new Date(savedAt.getTime() + SIX_MONTHS_MS).toISOString(),
    version: CONSENT_VERSION,
  };

  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.__LA_VOYAGERIE_CONSENT__ = consent;
  window.dispatchEvent(new CustomEvent("la-voyagerie:consent", { detail: consent }));
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex gap-5 border-t border-black/10 py-5 first:border-t-0">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-1 text-sm leading-6 text-ink/65">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${title} : ${checked ? "activés" : "désactivés"}`}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
          checked ? "bg-gold" : "bg-black/20"
        } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
      window.__LA_VOYAGERIE_CONSENT__ = saved;
    } else {
      setBannerOpen(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreferencesOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [preferencesOpen]);

  const applyChoice = (nextAnalytics: boolean, nextMarketing: boolean) => {
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    saveConsent(nextAnalytics, nextMarketing);
    setBannerOpen(false);
    setPreferencesOpen(false);
  };

  if (!ready) return null;

  return (
    <>
      {bannerOpen && !preferencesOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="fixed inset-x-4 bottom-4 z-[100] ml-auto max-w-[660px] rounded-[28px] border border-black/10 bg-white p-6 text-ink shadow-[0_24px_80px_rgba(20,15,10,0.28)] sm:inset-x-6 sm:bottom-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold sm:flex">
              <Cookie aria-hidden="true" size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="cookie-consent-title" className="font-display text-2xl">
                Gérer le consentement
              </h2>
              <p
                id="cookie-consent-description"
                className="mt-3 text-sm leading-6 text-ink/70 sm:text-base"
              >
                Nous utilisons des cookies nécessaires au fonctionnement du site. Avec votre accord,
                nous pouvons aussi utiliser des traceurs pour mesurer l’audience et améliorer nos
                communications. Vous restez libre d’accepter, de refuser ou de personnaliser votre
                choix.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => applyChoice(true, true)}
              className="min-h-12 rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={() => applyChoice(false, false)}
              className="min-h-12 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => setPreferencesOpen(true)}
              className="min-h-12 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Voir les préférences
            </button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-ink/60">
            <a
              className="underline-offset-4 hover:text-ink hover:underline"
              href="/politiques-de-confidentialite"
            >
              Politique de confidentialité
            </a>
            <a
              className="underline-offset-4 hover:text-ink hover:underline"
              href="/mentions-legales"
            >
              Mentions légales
            </a>
          </div>
        </section>
      )}

      {preferencesOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] bg-white p-6 text-ink shadow-2xl sm:rounded-[28px] sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-clay">La Voyagerie</p>
                <h2 id="cookie-preferences-title" className="mt-2 font-display text-3xl">
                  Vos préférences
                </h2>
              </div>
              <button
                type="button"
                aria-label="Fermer les préférences"
                onClick={() => setPreferencesOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-ink/65">
              Les cookies nécessaires restent actifs pour assurer la sécurité et le bon
              fonctionnement du site. Les autres catégories ne sont activées qu’avec votre accord.
            </p>

            <div className="mt-5">
              <PreferenceRow
                title="Cookies nécessaires"
                description="Indispensables au fonctionnement, à la sécurité et à la mémorisation de votre choix."
                checked
                disabled
              />
              <PreferenceRow
                title="Mesure d’audience"
                description="Nous aide à comprendre l’utilisation du site et à améliorer votre expérience."
                checked={analytics}
                onChange={setAnalytics}
              />
              <PreferenceRow
                title="Communication et marketing"
                description="Permet de mesurer nos campagnes et d’adapter nos communications."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => applyChoice(analytics, marketing)}
                className="min-h-12 rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                Enregistrer mes préférences
              </button>
              <button
                type="button"
                onClick={() => applyChoice(false, false)}
                className="min-h-12 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                Tout refuser
              </button>
            </div>
          </section>
        </div>
      )}

      {!bannerOpen && !preferencesOpen && (
        <button
          type="button"
          onClick={() => setPreferencesOpen(true)}
          className="fixed bottom-4 left-4 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-ink text-cream shadow-lg transition hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:bottom-6 sm:left-6"
          aria-label="Modifier mes préférences de cookies"
          title="Gérer les cookies"
        >
          <Cookie aria-hidden="true" size={19} />
        </button>
      )}
    </>
  );
}
