import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

const TITLE = "Contact — Composez votre voyage sur mesure | La Voyagerie";
const DESC =
  "Demandez votre devis voyage long-courrier sur mesure. Réponse personnalisée sous 3 jours. La Voyagerie, maison française de voyages d'auteur depuis 2014.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/contact" },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-16 md:pt-48 md:pb-24 paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-8">
            ✦ Demande de voyage sur mesure
          </p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight max-w-[18ch]">
            Racontez-nous
            <br />
            <em className="italic text-clay">votre voyage rêvé.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Chaque itinéraire commence par une conversation. Remplissez ce formulaire
            avec autant ou aussi peu de détails que vous le souhaitez — nous vous
            répondrons personnellement sous trois jours ouvrés.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
          <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start space-y-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">L'atelier</p>
              <p className="font-display text-2xl leading-snug">
                13 A rue de la Ciotat
                <br />
                13260 Cassis
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Sur rendez-vous, du mardi au samedi.
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">Écrire</p>
              <a
                href="mailto:bonjour@lavoyagerie.fr"
                className="font-display text-2xl italic hover:text-clay transition"
              >
                bonjour@lavoyagerie.fr
              </a>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">Téléphone</p>
              <a
                href="tel:+33483432949"
                className="font-display text-2xl italic hover:text-clay transition"
              >
                04 83 43 29 49
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Du lundi au vendredi · 10h–19h
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                « Plus vous nous en direz sur vous, plus nous saurons
                composer un voyage qui vous ressemble. »
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-14 bg-ink text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-3 gap-10">
          {[
            ["Réponse en 3 jours", "Une conseillère dédiée vous écrit personnellement, jamais de réponse automatique."],
            ["Devis sans engagement", "L'étude de votre projet est gratuite. Vous ne validez qu'une fois conquis."],
            ["Une équipe à votre écoute", "Joignable par téléphone, email ou en agence à Cassis. Suivi 24/7 pendant votre voyage."],
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
