"use client"

import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const stats = [
  { value: "5000+", label: "Products" },
  { value: "100+", label: "Brands" },
  { value: "50K+", label: "Happy Customers" },
  { value: "All India", label: "Delivery" },
]

const Hero = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-neutral-900 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?w=1920)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div
        className={`relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="inline-block bg-brand-orange text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
          TRUSTED SINCE 2024
        </span>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-3">
          Build Better. Build Stronger.
        </h1>

        <p className="text-base md:text-lg text-gray-300 max-w-2xl mb-6">
          Premium construction materials delivered to your site. Quality you can
          trust, prices you&apos;ll love.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <LocalizedClientLink
            href="/store"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
          >
            Shop Now
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/categories"
            className="border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-2.5 text-sm transition-colors"
          >
            View Categories
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl md:text-2xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
