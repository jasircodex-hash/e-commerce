import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryIcons: Record<string, string> = {
  "cement-concrete": "🏗️",
  "steel-tmt": "🔩",
  "tiles-flooring": "📐",
  "bricks-blocks": "🧱",
  "aggregates-sand": "⛰️",
  "pipes-fittings": "🔧",
  electrical: "⚡",
  plumbing: "🚿",
  "paints-finishes": "🎨",
  "timber-plywood": "🪵",
  "hardware-fasteners": "🔨",
  roofing: "🏠",
  "glass-windows": "🪟",
  "safety-equipment": "🦺",
  "tools-machinery": "🔧",
  "doors-windows": "🚪",
}

export default function CategoryListing({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
            <LocalizedClientLink href="/" className="hover:text-brand-orange transition-colors">Home</LocalizedClientLink>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-800 font-medium">Categories</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-brand-slate tracking-tight">
            All Categories
          </h1>
          <p className="text-neutral-500 mt-1 text-sm">
            Browse our complete range of building materials by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <LocalizedClientLink
              key={cat.id}
              href={`/categories/${cat.handle}`}
              className="group bg-white rounded-xl border border-neutral-200 p-6 hover:border-brand-orange/30 hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center text-2xl shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                  {categoryIcons[cat.handle] || "📦"}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-neutral-900 group-hover:text-brand-orange transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <span className="inline-block mt-3 text-xs font-medium text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse Products &rarr;
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}
