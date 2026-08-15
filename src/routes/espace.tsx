import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { EspaceDashboard } from "@/components/EspaceDashboard";
import { AuthCard } from "@/components/AuthCard";

export const Route = createFileRoute("/espace")({
  head: () => ({
    meta: [
      { title: "Espace voyageur — La Voyagerie" },
      { name: "description", content: "Retrouvez vos devis, voyages, factures et avantages fidélité Argent, Or, Platine." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  validateSearch: z.object({ next: z.string().optional() }).default({}).parse,
  component: EspacePage,
});

function EspacePage() {
  const { loading, user } = useAuth();
  const { next } = Route.useSearch();
  const navigate = useNavigate();

  // Une fois authentifié, si un "next" (chemin même origine) est présent,
  // renvoyer vers la destination initiale (typiquement la page de consentement OAuth).
  useEffect(() => {
    if (loading || !user || !next) return;
    if (!next.startsWith("/") || next.startsWith("//")) return;
    navigate({ to: next, replace: true } as never);
  }, [loading, user, next, navigate]);

  return (
    <div className="min-h-screen paper">
      <SiteHeader />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        {loading ? (
          <p className="text-center text-clay font-sans text-sm">Chargement…</p>
        ) : user ? (
          <EspaceDashboard />
        ) : (
          <AuthCard nextPath={next} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
