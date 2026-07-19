"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const demoProducts = [
  {
    id: "demo-1",
    title: "UltraTech OPC 53 Grade Cement",
    thumbnail:
      "https://images.pexels.com/photos/10924856/pexels-photo-10924856.jpeg?w=600",
    categories: [{ name: "Cement" }],
    variants: [{ prices: [{ amount: 380, currency_code: "INR" }] }],
  },
  {
    id: "demo-2",
    title: "JSW TMT Steel Bar 12mm",
    thumbnail:
      "https://images.pexels.com/photos/12311162/pexels-photo-12311162.jpeg?w=600",
    categories: [{ name: "Steel" }],
    variants: [{ prices: [{ amount: 74, currency_code: "INR" }] }],
  },
  {
    id: "demo-3",
    title: "Kajaria Vitrified Floor Tile 600x600",
    thumbnail:
      "https://images.pexels.com/photos/2724747/pexels-photo-2724747.jpeg?w=600",
    categories: [{ name: "Tiles" }],
    variants: [{ prices: [{ amount: 45, currency_code: "INR" }] }],
  },
  {
    id: "demo-4",
    title: "Asian Paints Royale Luxury Emulsion",
    thumbnail:
      "https://images.pexels.com/photos/6143308/pexels-photo-6143308.jpeg?w=600",
    categories: [{ name: "Paints" }],
    variants: [{ prices: [{ amount: 520, currency_code: "INR" }] }],
  },
]

interface FeaturedProductsProps {
  products?: HttpTypes.StoreProduct[]
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const items = products && products.length > 0 ? products : demoProducts

  const getPrice = (product: HttpTypes.StoreProduct) => {
    const variant = product.variants?.[0]
    const price = variant?.prices?.[0]
    if (!price) return null
    return convertToLocale({
      amount: price.amount as number,
      currency_code: price.currency_code as string,
    })
  }

  const getCategory = (product: HttpTypes.StoreProduct) => {
    const cat = product.categories?.[0]
    return cat?.name || null
  }

  return (
    <section className="py-16 md:py-24">
      <div className="content-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Premium construction materials at best prices
            </p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="btn-ghost text-body-sm font-semibold gap-1 hidden sm:inline-flex"
          >
            Shop All
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => {
            const price = getPrice(product)
            const category = getCategory(product)

            return (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle || product.id}`}
                className="group"
              >
                <div className="card-hover overflow-hidden">
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <img
                      src={product.thumbnail || ""}
                      alt={product.title || ""}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                      className="absolute bottom-3 left-3 right-3 btn-primary text-body-sm py-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="p-4">
                    {category && (
                      <p className="text-body-xs text-brand-orange font-medium mb-1 uppercase tracking-wide">
                        {category}
                      </p>
                    )}
                    <h3 className="text-body-md font-medium text-brand-slate line-clamp-2 mb-2 group-hover:text-brand-orange transition-colors duration-200">
                      {product.title}
                    </h3>
                    {price && (
                      <p className="text-heading-md font-bold text-brand-slate">
                        {price}
                      </p>
                    )}
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <LocalizedClientLink
            href="/store"
            className="btn-secondary text-body-sm font-semibold"
          >
            Shop All Products
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
