import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AutoBreadcrumb } from "@/components/AutoBreadcrumb";
import { CookieConsent } from "@/components/CookieConsent";

const SITE_URL = "https://lavoyagerie.fr";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "La Voyagerie",
  description:
    "Agence de voyage sur mesure à Cassis, spécialisée dans les voyages long-courrier d'auteur. Itinéraires personnalisés au Japon, Philippines, Ouganda, Zimbabwe, Canada, Brésil, Polynésie.",
  url: SITE_URL,
  email: "bonjour@lavoyagerie.fr",
  telephone: "+33483432949",
  priceRange: "€€€",
  founder: {
    "@type": "Person",
    name: "Laurence Palandjian",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "13 A rue de la Ciotat",
    addressLocality: "Cassis",
    postalCode: "13260",
    addressCountry: "FR",
  },
  areaServed: [
    "Japon",
    "Philippines",
    "Ouganda",
    "Zimbabwe",
    "Canada",
    "Brésil",
    "Polynésie",
    "Afrique",
    "Asie",
    "Amériques",
    "Océanie",
  ],
  sameAs: [
    "https://www.instagram.com/lavoyagerie",
    "https://www.linkedin.com/in/laurence-palandjian-a55626300/",
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-4">Erreur 404</p>
        <h1 className="font-display text-6xl text-foreground">
          Page <em className="italic text-gold-gradient">introuvable</em>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Cette page n'existe pas ou s'est égarée en route. Il arrive aussi aux pages de voyager.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-cream hover:bg-clay transition"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "La Voyagerie" },
      { name: "theme-color", content: "#1a1410" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "La Voyagerie" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "La Voyagerie" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@lavoyagerie" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500&family=Caveat:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <AutoBreadcrumb />
      <Outlet />
      <CookieConsent />
    </>
  );
}
