import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getArticle, type Article } from "@/data/blog";

export const Route = createFileRoute("/blog-agence-voyage/$slug")({
  loader: ({ params }): { article: Article } => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { article: a };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article | La Voyagerie" }] };
    const TITLE = `${a.title} | Journal La Voyagerie`;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: a.excerpt },
        { property: "og:image", content: a.img },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://lavoyagerie.fr/blog-agence-voyage/${a.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://lavoyagerie.fr/blog-agence-voyage/${a.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            image: a.img,
            datePublished: a.date,
            author: { "@type": "Organization", name: "La Voyagerie" },
            publisher: { "@type": "Organization", name: "La Voyagerie" },
            description: a.excerpt,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <Link to="/blog-agence-voyage" className="font-display text-3xl">Retour au journal</Link>
    </div>
  ),
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader overlay />

      <section className="relative h-[60svh] min-h-[400px] overflow-hidden">
        <img src={a.img} alt={a.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/80" />
        <div className="relative h-full mx-auto max-w-[1100px] px-6 md:px-12 flex flex-col justify-end pb-16 text-cream">
          <Link to="/blog-agence-voyage" className="text-[11px] uppercase tracking-[0.3em] mb-6 opacity-80 hover:opacity-100">
            ← Journal
          </Link>
          <p className="text-[11px] uppercase tracking-[0.3em] mb-4 opacity-80">{a.category} · {a.date}</p>
          <h1 className="font-display text-3xl md:text-[2rem] lg:text-4xl leading-[1.05] tracking-tight">{a.title}</h1>
        </div>
      </section>

      <article className="py-14 md:py-20">
        <div className="mx-auto max-w-[760px] px-6 md:px-12 space-y-8">
          <p className="font-display text-2xl md:text-3xl leading-[1.4] text-clay italic">{a.excerpt}</p>
          {a.body.map((p: string, i: number) => (
            <p key={i} className="text-lg leading-relaxed text-foreground">{p}</p>
          ))}
        </div>
      </article>

      <section className="py-14 bg-ink text-cream text-center">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <h2 className="font-display text-3xl md:text-[2rem] lg:text-4xl">Envie de partir ? <em className="italic text-ochre">Composons votre voyage.</em></h2>
          <Link to="/demande-de-devis" className="mt-10 inline-flex items-center bg-cream text-ink px-10 py-5 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay hover:text-cream transition">
            Demander un devis →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
