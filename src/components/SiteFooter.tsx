import { Link } from "@tanstack/react-router";
import { GoogleReviews } from "./GoogleReviews";

export function SiteFooter() {
  return (
    <>
      <GoogleReviews />
      <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-display text-3xl">
            La Voyagerie<span className="text-clay">.</span>
          </div>
          <p className="mt-6 text-sm opacity-70 max-w-sm font-sans leading-relaxed">
            Agence de voyage sur mesure à Cassis. Itinéraires d'auteur taillés à la main
            vers les plus belles destinations long-courrier — Japon, Philippines, Ouganda,
            Zimbabwe, Canada, Brésil, Polynésie.
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.25em] opacity-60">
            Et vous, où iriez-vous&nbsp;?
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-5">Naviguer</p>
          <ul className="space-y-3 text-sm font-sans">
            <li><Link to="/" className="hover:text-clay transition">Accueil</Link></li>
            <li><Link to="/a-propos-de-nous" className="hover:text-clay transition">L'agence</Link></li>
            <li><Link to="/blog-agence-voyage" className="hover:text-clay transition">Journal</Link></li>
            <li><Link to="/prise-de-rendez-vous" className="hover:text-clay transition">Rendez-vous</Link></li>
            <li><Link to="/demande-de-devis" className="hover:text-clay transition">Devis</Link></li>
            <li><Link to="/paiements" className="hover:text-clay transition">Paiement</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-5">Destinations</p>
          <ul className="space-y-3 text-sm font-sans">
            <li><Link to="/voyage-sur-mesure/$continent" params={{ continent: "afrique" }} className="hover:text-clay transition">Afrique</Link></li>
            <li><Link to="/voyage-sur-mesure/$continent" params={{ continent: "ameriques" }} className="hover:text-clay transition">Amériques</Link></li>
            <li><Link to="/voyage-sur-mesure/$continent" params={{ continent: "asie" }} className="hover:text-clay transition">Asie</Link></li>
            <li><Link to="/voyage-sur-mesure/$continent" params={{ continent: "oceanie" }} className="hover:text-clay transition">Océanie</Link></li>
            <li><Link to="/voyage-sur-mesure/$continent" params={{ continent: "europe" }} className="hover:text-clay transition">Europe</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-5">L'atelier</p>
          <address className="not-italic text-sm font-sans space-y-2 opacity-90">
            <div>13 A rue de la Ciotat</div>
            <div>13260 Cassis — France</div>
            <div className="pt-3">
              <a href="mailto:bonjour@lavoyagerie.fr" className="hover:text-clay transition">
                bonjour@lavoyagerie.fr
              </a>
            </div>
            <div>
              <a href="tel:+33483432949" className="hover:text-clay transition">
                04 83 43 29 49
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] opacity-60">
          <p>© {new Date().getFullYear()} La Voyagerie · Agence de voyage sur mesure à Cassis</p>
          <div className="flex gap-6 flex-wrap">
            <a href="https://www.instagram.com/lavoyagerie" target="_blank" rel="noopener" className="hover:text-clay">Instagram</a>
            <Link to="/mentions-legales" className="hover:text-clay">Mentions légales</Link>
            <Link to="/politiques-de-confidentialite" className="hover:text-clay">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
