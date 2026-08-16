import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ShieldCheck, FileText, CreditCard, MailCheck } from "lucide-react";

const TITLE = "Paiement de votre voyage — Plateforme sécurisée | La Voyagerie";
const DESC =
  "Réglez votre voyage en toute sécurité via notre plateforme de paiement bancaire. Paiement par carte bancaire sécurisé par la Société Générale.";
const PAYMENT_URL = "https://sogecommerce.societegenerale.eu/vads-site/LA_VOYAGERIE";

export const Route = createFileRoute("/paiements")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/paiements" },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/paiements" }],
  }),
  component: PaiementsPage,
});

const steps = [
  {
    icon: FileText,
    title: "Vérifiez votre devis",
    text: "Avant de procéder au paiement, assurez-vous d'avoir bien reçu et consulté le récapitulatif détaillé de votre voyage par email. Ce document reprend l'ensemble de votre itinéraire et le montant total à régler.",
  },
  {
    icon: CreditCard,
    title: "Accédez au paiement sécurisé",
    text: "Cliquez sur le bouton ci-dessous pour être redirigé vers notre plateforme de paiement en ligne entièrement sécurisée. Vous pourrez y régler votre voyage par carte bancaire en quelques clics, en toute tranquillité.",
  },
  {
    icon: MailCheck,
    title: "Recevez votre confirmation",
    text: "Une fois votre paiement validé, vous recevrez immédiatement un email de confirmation contenant tous les détails de votre règlement. Nous restons à votre disposition pour toute question concernant votre voyage.",
  },
];

function PaiementsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-24 paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-8">
            ✦ Paiement de votre voyage
          </p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight max-w-[18ch]">
            Réglez votre voyage
            <br />
            <em className="italic text-gold-gradient">en toute sérénité.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Accédez à notre plateforme de paiement sécurisée, opérée par la Société Générale.
            Un règlement simple, rapide et entièrement protégé.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-clay transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              Régler mon voyage
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-clay" />
              Paiement sécurisé SSL · Société Générale
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">
            ✦ Comment ça fonctionne
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-[20ch]">
            Suivez ces étapes pour <em className="italic text-gold-gradient">régler votre voyage</em> simplement.
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="border-t border-border pt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display text-4xl text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-2xl mb-4">{s.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="bg-cream p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-5xl leading-tight tracking-tight">
              Prêt à régler votre voyage&nbsp;?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Vous allez être redirigé vers la plateforme de paiement sécurisée de la Société Générale.
            </p>
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-clay transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              J'accède au paiement sécurisé
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
