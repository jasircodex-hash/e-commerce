"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryImages: Record<string, string> = {
  cement:
    "https://images.pexels.com/photos/10924856/pexels-photo-10924856.jpeg?w=600",
  steel:
    "https://images.pexels.com/photos/12311162/pexels-photo-12311162.jpeg?w=600",
  tiles:
    "https://images.pexels.com/photos/2724747/pexels-photo-2724747.jpeg?w=600",
  bricks:
    "https://images.pexels.com/photos/6143308/pexels-photo-6143308.jpeg?w=600",
}

const getCategoryImage = (name: string): string => {
  const key = name.toLowerCase()
  if (categoryImages[key]) return categoryImages[key]
  return "https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?w=600"
}

interface Category {
  id: string
  handle: string
  name: string
}

interface CategoryShowcaseProps {
  categories: Category[]
}

const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  return (
    <section className="py-16 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Shop by Category
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Explore our wide range of premium construction materials
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="group relative h-56 rounded-sm overflow-hidden block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${getCategoryImage(category.name)})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg">{category.name}</h3>
                <span className="text-brand-orange text-sm font-medium inline-flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore
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
                </span>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase
