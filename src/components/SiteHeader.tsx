import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { continents } from "@/data/destinations";
import { supabase } from "@/integrations/supabase/client";
import { SiteSearch } from "@/components/SiteSearch";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [destOpenMobile, setDestOpenMobile] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const resolveName = async (userId: string | undefined, email: string | null | undefined, meta: any) => {
      if (!userId) {
        setDisplayName(null);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("user_id", userId)
        .maybeSingle();
      const first = profile?.first_name || meta?.first_name || "";
      const last = profile?.last_name || meta?.last_name || "";
      const full = [first, last ? last.toUpperCase() : ""].filter(Boolean).join(" ").trim();
      setDisplayName(full || (email ? email.split("@")[0] : "Mon espace"));
    };

    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      void resolveName(u?.id, u?.email, u?.user_metadata);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => {
      const u = sess?.user;
      void resolveName(u?.id, u?.email, u?.user_metadata);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const dark = overlay && !scrolled && !open && !destOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open || destOpen ? "bg-cream/95 backdrop-blur-md border-b border-border" : ""
      }`}
      onMouseLeave={() => setDestOpen(false)}
    >
      <div
        className={`mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-5 md:px-12 py-4 md:py-5 flex items-center justify-between gap-3 ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        <Link to="/" className="font-display text-xl tracking-tight leading-none">
          La Voyagerie<span className="text-clay">.</span>
          <span className="block text-[9px] uppercase tracking-[0.3em] opacity-70 mt-1 font-sans whitespace-nowrap">
            Maison de voyage sur mesure
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.22em] font-sans">
          <div
            onMouseEnter={() => setDestOpen(true)}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setDestOpen((v) => !v)}
              className="hover:text-clay transition flex items-center gap-1.5"
            >
              DESTINATIONS
              <span className="text-[8px]">▾</span>
            </button>
          </div>
          <Link to="/experiences" className="hover:text-clay transition">
            Expériences
          </Link>
          <Link to="/a-propos-de-nous" className="hover:text-clay transition">
            L'agence
          </Link>
          <Link to="/blog-agence-voyage" className="hover:text-clay transition">
            Blog
          </Link>
          <Link to="/prise-de-rendez-vous" className="hover:text-clay transition">
            Rendez-vous
          </Link>
          <Link to="/demande-de-devis" className="hover:text-clay transition">
            Devis
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className={dark ? "text-cream/80 hover:text-cream" : "text-ink hover:text-clay"}>
            <SiteSearch variant="header" />
          </div>
          <Link
            to="/espace"
            className={`hidden md:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] transition ${
              dark ? "text-cream/80 hover:text-cream" : "text-clay hover:text-ink"
            }`}
          >
            {displayName ? (
              <>
                <span className="text-[8px]">◆</span>
                <span className="normal-case tracking-normal font-display italic text-sm">{displayName}</span>
              </>
            ) : (
              "Espace"
            )}
          </Link>
          <Link
            to="/demande-de-devis"
            className={`hidden sm:inline-flex text-[11px] uppercase tracking-[0.22em] rounded-full px-5 py-2.5 transition border ${
              dark
                ? "border-cream/60 hover:bg-cream hover:text-ink"
                : "border-ink bg-ink text-cream hover:bg-clay hover:border-clay"
            }`}
          >
            Devis sur mesure
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            <span className="block w-6 h-px bg-current mb-1.5" />
            <span className="block w-6 h-px bg-current mb-1.5" />
            <span className="block w-4 h-px bg-current ml-auto" />
          </button>
        </div>
      </div>

      {/* MEGA MENU DESTINATIONS — desktop */}
      {destOpen && (
        <div className="hidden lg:block bg-cream border-t border-border">
          <div className="mx-auto max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1560px] px-12 py-10 grid grid-cols-5 gap-8">
            {continents.map((c) => (
              <div key={c.slug}>
                <Link
                  to="/voyage-sur-mesure/$continent"
                  params={{ continent: c.slug }}
                  onClick={() => setDestOpen(false)}
                  className="font-display text-2xl text-ink hover:text-clay transition italic block mb-4"
                >
                  {c.name}
                </Link>
                <ul className="space-y-2">
                  {c.pays.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/voyage-sur-mesure/$continent/$pays"
                        params={{ continent: c.slug, pays: p.slug }}
                        onClick={() => setDestOpen(false)}
                        className="text-[12px] text-muted-foreground hover:text-clay transition"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border bg-ink text-cream px-12 py-4 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.3em] text-ochre">
              Et vous, où iriez-vous ?
            </p>
            <Link
              to="/voyage-sur-mesure"
              onClick={() => setDestOpen(false)}
              className="text-[11px] uppercase tracking-[0.22em] hover:text-ochre transition"
            >
              Voir toutes les destinations →
            </Link>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-border max-h-[80vh] overflow-y-auto">
          <nav className="px-6 py-6 flex flex-col gap-4 text-[12px] uppercase tracking-[0.22em] text-ink">
            <div onClick={() => setOpen(false)}>
              <SiteSearch variant="mobile" />
            </div>
            <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
            <button
              type="button"
              onClick={() => setDestOpenMobile((v) => !v)}
              className="text-left flex items-center justify-between uppercase"
            >
              <span>Destinations</span>
              <span className="text-[8px]">{destOpenMobile ? "▴" : "▾"}</span>
            </button>
            {destOpenMobile && (
              <div className="pl-4 space-y-4 border-l border-border">
                {continents.map((c) => (
                  <div key={c.slug}>
                    <Link
                      to="/voyage-sur-mesure/$continent"
                      params={{ continent: c.slug }}
                      onClick={() => setOpen(false)}
                      className="font-display italic text-base text-clay block mb-2"
                    >
                      {c.name}
                    </Link>
                    <ul className="space-y-1.5">
                      {c.pays.map((p) => (
                        <li key={p.slug}>
                          <Link
                            to="/voyage-sur-mesure/$continent/$pays"
                            params={{ continent: c.slug, pays: p.slug }}
                            onClick={() => setOpen(false)}
                            className="text-[11px] text-muted-foreground"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <Link to="/experiences" onClick={() => setOpen(false)}>Expériences</Link>
            <Link to="/a-propos-de-nous" onClick={() => setOpen(false)}>L'agence</Link>
            <Link to="/blog-agence-voyage" onClick={() => setOpen(false)}>Blog</Link>
            <Link to="/prise-de-rendez-vous" onClick={() => setOpen(false)}>Prendre rendez-vous</Link>
            <Link to="/espace" onClick={() => setOpen(false)}>Espace voyageur</Link>
            <Link to="/demande-de-devis" onClick={() => setOpen(false)} className="bg-ink text-cream rounded-full px-5 py-3 text-center mt-2">Demande de devis</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
