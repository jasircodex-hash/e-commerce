import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightIcon } from "@modules/common/icons/icons"

const articles = [
  {
    title: "Choosing the Right Cement for Your Construction Project",
    excerpt: "A comprehensive guide to selecting the best cement grade for foundations, slabs, and plastering work.",
    category: "Guides",
    date: "Jun 15, 2026",
    image: "https://images.pexels.com/photos/10924856/pexels-photo-10924856.jpeg",
  },
  {
    title: "TMT Bars vs HYSD Bars: Which Reinforcement Steel is Better?",
    excerpt: "Compare the strength, ductility, and cost-effectiveness of TMT and HYSD steel bars for your structure.",
    category: "Comparisons",
    date: "Jun 8, 2026",
    image: "https://images.pexels.com/photos/12311162/pexels-photo-12311162.jpeg",
  },
  {
    title: "A Complete Guide to Vitrified Tiles for Indian Homes",
    excerpt: "Everything you need to know about vitrified tiles—types, finishes, sizes, and installation tips.",
    category: "Guides",
    date: "May 28, 2026",
    image: "https://images.pexels.com/photos/2762672/pexels-photo-2762672.jpeg",
  },
]

const LatestArticles = () => {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-orange font-semibold text-body-sm uppercase tracking-wider mb-2">
              BuildMart Blog
            </p>
            <h2 className="text-heading-xl font-display font-bold text-brand-slate">
              Latest Articles
            </h2>
            <p className="text-body-md text-neutral-500 mt-2 max-w-2xl">
              Expert advice, buying guides, and industry insights for builders and homeowners.
            </p>
          </div>
          <LocalizedClientLink
            href="/blog"
            className="hidden md:flex items-center gap-1.5 text-body-sm font-medium text-brand-orange hover:text-brand-orange/80 transition-colors"
          >
            View All Articles
            <ChevronRightIcon className="w-4 h-4" />
          </LocalizedClientLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.title} className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-card transition-all duration-300">
              <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-caption font-medium text-brand-orange bg-brand-orange/5 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-caption text-neutral-400">{article.date}</span>
                </div>
                <h3 className="text-body-lg font-bold text-brand-slate group-hover:text-brand-orange transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-body-sm text-neutral-500 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <span className="text-body-sm font-medium text-brand-orange group-hover:text-brand-orange/80 transition-colors inline-flex items-center gap-1">
                    Read More
                    <ChevronRightIcon className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <LocalizedClientLink
          href="/blog"
          className="md:hidden flex items-center justify-center gap-1.5 mt-8 text-body-sm font-medium text-brand-orange hover:text-brand-orange/80 transition-colors"
        >
          View All Articles
          <ChevronRightIcon className="w-4 h-4" />
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default LatestArticles
