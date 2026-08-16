import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

const TITLE = "Demande de devis voyage sur mesure | La Voyagerie";
const DESC =
  "Obtenez un devis personnalisé pour votre voyage long-courrier sur mesure. Étude gratuite et sans engagement, réponse sous 3 jours ouvrés par La Voyagerie.";

export const Route = createFileRoute("/demande-de-devis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/demande-de-devis" },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/demande-de-devis" }],
  }),
  component: DemandeDevis,
});

function DemandeDevis() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-16 md:pt-48 md:pb-24 paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-8">
            ✦ Demande de devis
          </p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight max-w-[18ch]">
            Racontez-nous
            <br />
            <em className="italic text-clay">votre voyage rêvé.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Chaque itinéraire commence par une conversation. Quelques lignes suffisent —
            nous vous répondons personnellement sous trois jours ouvrés, avec une première
            ébauche de voyage taillée pour vous.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
          <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start space-y-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">L'agence</p>
              <p className="font-display text-2xl leading-snug">
                13 A rue de la Ciotat
                <br />
                13260 Cassis
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">Téléphone</p>
              <a href="tel:+33483432949" className="font-display text-2xl italic hover:text-clay transition">
                04 83 43 29 49
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">Email</p>
              <a href="mailto:bonjour@lavoyagerie.fr" className="font-display text-2xl italic hover:text-clay transition">
                bonjour@lavoyagerie.fr
              </a>
            </div>
            <div className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                « Plus vous nous en direz sur vous, plus nous saurons composer un voyage qui vous ressemble. »
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-14 bg-ink text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-3 gap-10">
          {[
            ["Réponse en 3 jours", "Une conseillère dédiée vous écrit personnellement, jamais de réponse automatique."],
            ["Devis sans engagement", "L'étude de votre projet est gratuite. Vous ne validez qu'une fois conquis."],
            ["Suivi 24/7 en voyage", "Nous restons joignables pendant tout votre séjour, où que vous soyez."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-4">✦</p>
              <h3 className="font-display text-2xl mb-3">{t}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
