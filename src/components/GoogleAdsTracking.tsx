import { useEffect } from "react";
import {
  captureMarketingAttribution,
  denyGoogleAdsConsent,
  initializeGoogleAds,
} from "@/lib/marketing-attribution";

export function GoogleAdsTracking() {
  useEffect(() => {
    captureMarketingAttribution();
    initializeGoogleAds();

    const onConsent = (event: Event) => {
      const marketing = (event as CustomEvent<{ marketing?: boolean }>).detail?.marketing === true;
      if (marketing) initializeGoogleAds();
      else denyGoogleAdsConsent();
    };
    window.addEventListener("la-voyagerie:consent", onConsent);
    return () => window.removeEventListener("la-voyagerie:consent", onConsent);
  }, []);

  return null;
}
