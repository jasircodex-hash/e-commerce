"use client"

const brands = [
  "UltraTech",
  "ACC",
  "Ramco",
  "Dalmia",
  "JSW",
  "Tata Steel",
  "Kajaria",
  "Somany",
  "Asian Paints",
  "Berger",
  "Astral",
  "Finolex",
  "Havells",
  "Polycab",
]

const BrandsShowcase = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="content-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">Popular Brands</h2>
          <p className="section-subtitle mx-auto">
            India&apos;s most trusted construction brands
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="card-hover flex items-center justify-center p-5 h-24 rounded-xl cursor-pointer group"
            >
              <span className="text-body-md font-semibold text-neutral-600 group-hover:text-brand-orange transition-colors duration-200 text-center leading-tight">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsShowcase
