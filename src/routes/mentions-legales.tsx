import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Mentions légales | La Voyagerie — Agence de voyage Cassis";
const DESC =
  "Mentions légales de La Voyagerie, agence de voyage sur mesure à Cassis. Éditeur, hébergement, propriété intellectuelle et contact.";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/mentions-legales" }],
  }),
  component: MentionsLegales,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 border-b border-border last:border-0">
      <h2 className="font-display text-2xl md:text-3xl text-clay mb-5">{title}</h2>
      <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-sans max-w-3xl">
        {children}
      </div>
    </section>
  );
}

function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-12 md:pt-48 paper">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">
            ✦ Informations légales
          </p>
          <h1 className="font-display text-5xl md:text-[2rem] lg:text-4xl leading-[0.95] tracking-tight">
            Mentions <em className="italic text-clay">légales.</em>
          </h1>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <Section title="Informations générales du site">
            <p>
              <strong className="text-foreground">La Voyagerie</strong> — Agence de voyage sur mesure.
            </p>
            <p>
              Adresse de l'agence : 13 A rue de la Ciotat, 13260 Cassis, France.<br />
              Siège social : 12 Bd du Monument, 13012 Marseille, France.<br />
              Téléphone : <a href="tel:+33483432949" className="underline hover:text-clay">04 83 43 29 49</a>
            </p>
            <p>
              Directeur de la publication : <strong className="text-foreground">Laurence Palandjian</strong> — Gérante.<br />
              Responsable de la rédaction : Laurence Palandjian.
            </p>
          </Section>

          <Section title="Hébergement">
            <p>
              Hébergeur : <strong className="text-foreground">Squarespace, Inc.</strong><br />
              Siège social : 225 Varick Street, 12th Floor, New York, NY 10014, États-Unis
            </p>
          </Section>

          <Section title="Développement et webmaster">
            <p>
              Site développé et maintenu en interne par La Voyagerie.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question ou demande d'information, contactez-nous par e-mail à&nbsp;
              <a href="mailto:bonjour@lavoyagerie.fr" className="underline hover:text-clay">bonjour@lavoyagerie.fr</a>
              &nbsp;ou par téléphone au <a href="tel:+33483432949" className="underline hover:text-clay">04 83 43 29 49</a>.
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L'ensemble des contenus présents sur ce site (textes, photographies, logos,
              graphismes, mises en page) est la propriété exclusive de La Voyagerie ou
              de ses partenaires, et est protégé par les lois françaises et internationales
              relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle,
              est strictement interdite sans autorisation écrite préalable.
            </p>
          </Section>

          <Section title="Données personnelles">
            <p>
              Pour toute information concernant le traitement de vos données personnelles, consultez notre&nbsp;
              <a href="/politiques-de-confidentialite" className="underline hover:text-clay">politique de confidentialité</a>.
            </p>
          </Section>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
