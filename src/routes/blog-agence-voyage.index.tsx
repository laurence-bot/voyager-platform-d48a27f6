import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { articles } from "@/data/blog";

const TITLE = "Blog & carnets de voyage | La Voyagerie";
const DESC =
  "Récits, conseils et inspirations de l'agence La Voyagerie : Afrique, Asie, Amériques, Océanie. Découvrez nos carnets pour préparer vos prochains voyages sur mesure.";

export const Route = createFileRoute("/blog-agence-voyage/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "blog voyage, conseils voyage sur mesure, carnet de voyage, agence de voyage Cassis" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/blog-agence-voyage" },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/blog-agence-voyage" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-40 pb-16 md:pt-48 md:pb-24 paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">
            ✦ Le journal de l'agence
          </p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tight max-w-[18ch]">
            Conseils &amp; <em className="italic text-clay">récits.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Carnets de route, conseils pratiques et coups de cœur — pour préparer
            votre prochain voyage long-courrier en toute confiance.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/blog-agence-voyage/$slug"
                  params={{ slug: a.slug }}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={a.img}
                      alt={a.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-clay mt-5 mb-3">{a.category} · {a.date}</p>
                  <h2 className="font-display text-2xl md:text-3xl leading-[1.1] mb-4 group-hover:text-clay transition">
                    {a.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-ink group-hover:text-clay transition">
                    Lire l'article →
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-20 text-center">
            <Link
              to="/demande-de-devis"
              className="inline-flex items-center bg-ink text-cream px-12 py-5 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay transition"
            >
              Composer mon voyage →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
