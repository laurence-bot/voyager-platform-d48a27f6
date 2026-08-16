import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Politique de confidentialité | La Voyagerie";
const DESC =
  "Politique de confidentialité et gestion des cookies de La Voyagerie, agence de voyage sur mesure à Cassis. RGPD, finalités, durée de conservation.";

export const Route = createFileRoute("/politiques-de-confidentialite")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/politiques-de-confidentialite" }],
  }),
  component: Privacy,
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

function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-12 md:pt-48 paper">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">
            ✦ Vos données, votre confiance
          </p>
          <h1 className="font-display text-5xl md:text-[2rem] lg:text-4xl leading-[0.95] tracking-tight">
            Politique de <em className="italic text-clay">confidentialité.</em>
          </h1>
        </div>
      </section>

      <article className="py-8 md:py-12">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <Section title="Responsable du traitement">
            <p>
              Le responsable du traitement des données collectées sur ce site est&nbsp;
              <strong className="text-foreground">La Voyagerie</strong>, 13 A rue de la Ciotat, 13260 Cassis (siège social : 12 Bd du Monument, 13012 Marseille).
              Contact : <a href="mailto:bonjour@lavoyagerie.fr" className="underline hover:text-clay">bonjour@lavoyagerie.fr</a>.
            </p>
          </Section>

          <Section title="Données collectées">
            <p>
              Nous collectons uniquement les données que vous nous transmettez volontairement via nos
              formulaires (nom, prénom, email, téléphone, projet de voyage, budget, dates).
            </p>
            <p>
              Nous collectons également des données techniques anonymisées de navigation à des fins
              de mesure d'audience et d'amélioration du site.
            </p>
          </Section>

          <Section title="Finalités">
            <p>
              Vos données sont utilisées exclusivement pour&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Répondre à vos demandes d'information et de devis voyage sur mesure ;</li>
              <li>Vous adresser, avec votre consentement, notre newsletter et nos actualités ;</li>
              <li>Améliorer la qualité de notre site et de nos services.</li>
            </ul>
          </Section>

          <Section title="Durée de conservation">
            <p>
              Les données issues du formulaire de contact sont conservées 3 ans à compter du dernier
              échange. Les données de mesure d'audience sont conservées 13 mois maximum.
            </p>
          </Section>

          <Section title="Destinataires">
            <p>
              Vos données ne sont jamais cédées ni revendues à des tiers à des fins commerciales.
              Elles sont accessibles uniquement à l'équipe de La Voyagerie et, le cas échéant, à
              nos partenaires locaux pour la composition de votre voyage.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit
              d'accès, de rectification, d'effacement, de portabilité et d'opposition. Pour exercer
              ces droits, écrivez à&nbsp;
              <a href="mailto:bonjour@lavoyagerie.fr" className="underline hover:text-clay">bonjour@lavoyagerie.fr</a>.
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Notre site utilise des cookies fonctionnels strictement nécessaires, et — sous
              réserve de votre consentement — des cookies de mesure d'audience et de marketing.
              Vous pouvez à tout moment modifier vos préférences depuis le bandeau de gestion des
              cookies.
            </p>
          </Section>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
