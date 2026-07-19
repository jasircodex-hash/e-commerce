'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"

const FILTER_SECTIONS = [
  {
    id: "category",
    title: "Category",
    options: [
      { label: "Cement & Concrete", value: "cement" },
      { label: "Steel & TMT", value: "steel-tmt" },
      { label: "Bricks & Blocks", value: "bricks-blocks" },
      { label: "Sand & Aggregates", value: "sand-aggregates" },
      { label: "Ready Mix Concrete", value: "ready-mix-concrete" },
      { label: "Tiles", value: "tiles" },
      { label: "Marble & Granite", value: "marble-granite" },
      { label: "Paints", value: "paints" },
      { label: "Plumbing", value: "plumbing" },
      { label: "Electrical", value: "electrical" },
      { label: "Roofing", value: "roofing" },
      { label: "Doors & Windows", value: "doors-windows" },
      { label: "Hardware", value: "hardware" },
      { label: "Construction Tools", value: "construction-tools" },
    ],
  },
  {
    id: "price",
    title: "Price Range",
    type: "range",
  },
  {
    id: "availability",
    title: "Availability",
    options: [
      { label: "In Stock", value: "in_stock" },
      { label: "Out of Stock", value: "out_of_stock" },
      { label: "Bulk Available", value: "bulk" },
    ],
  },
  {
    id: "features",
    title: "Features",
    options: [
      { label: "Bulk Available", value: "bulk_available" },
      { label: "GST Eligible", value: "gst" },
      { label: "Fast Delivery", value: "fast_delivery" },
      { label: "Free Shipping", value: "free_shipping" },
    ],
  },
  {
    id: "rating",
    title: "Rating",
    options: [
      { label: "★★★★★ (4.5+)", value: "4.5" },
      { label: "★★★★☆ (4.0+)", value: "4.0" },
      { label: "★★★☆☆ (3.5+)", value: "3.5" },
      { label: "★★☆☆☆ (3.0+)", value: "3.0" },
    ],
  },
]

function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-neutral-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-3.5 text-left group"
        aria-expanded={open}
      >
        <span className="text-body-xs font-semibold text-neutral-500 uppercase tracking-wider">
          {title}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-5 pb-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function StoreSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null) params.delete(name)
      else params.set(name, value)
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  const toggleArrayParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const current = params.getAll(name)
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      params.delete(name)
      next.forEach((v) => params.append(name, v))
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  const selectedCategories = searchParams.getAll("category_id")

  const hasAnyFilter = searchParams.toString().length > 0

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24">
        <div className="bg-white rounded-xl border border-neutral-200/80 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-body-sm font-semibold text-neutral-800">Filters</span>
            {hasAnyFilter && (
              <button
                onClick={() => router.push(pathname)}
                className="text-caption font-medium text-brand-orange hover:text-brand-orange-dark transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <AccordionSection title="Category">
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {FILTER_SECTIONS[0].options!.map((cat) => (
                <label
                  key={cat.value}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => toggleArrayParam("category_id", cat.value)}
                    className="filter-checkbox"
                  />
                  <span className="text-body-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Price Range" defaultOpen={false}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-caption text-neutral-400">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full pl-6 pr-2.5 py-2 text-body-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
              <span className="text-neutral-300 text-body-xs">—</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-caption text-neutral-400">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full pl-6 pr-2.5 py-2 text-body-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-2 w-full py-2 text-body-xs font-semibold bg-brand-orange text-white rounded-lg hover:bg-brand-orange-dark transition-colors"
            >
              Apply
            </button>
          </AccordionSection>

          <AccordionSection title="Availability" defaultOpen={false}>
            <div className="space-y-2">
              {FILTER_SECTIONS[2].options!.map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                  />
                  <span className="text-body-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Features" defaultOpen={false}>
            <div className="space-y-2">
              {FILTER_SECTIONS[3].options!.map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                  />
                  <span className="text-body-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Rating" defaultOpen={false}>
            <div className="space-y-2">
              {FILTER_SECTIONS[4].options!.map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="rating"
                    className="w-4 h-4 border-neutral-300 text-brand-orange focus:ring-brand-orange/30 cursor-pointer"
                  />
                  <span className="text-body-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionSection>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-br from-brand-orange/5 to-brand-orange/10 rounded-xl border border-brand-orange/20">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span className="text-body-xs font-semibold text-brand-slate">Bulk Orders</span>
          </div>
          <p className="text-caption text-neutral-500 leading-relaxed">
            Get special pricing for bulk and wholesale orders. Call our sales team.
          </p>
          <a
            href="tel:+1800123456"
            className="mt-2 inline-flex items-center gap-1 text-caption font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Request Quote
          </a>
        </div>
      </div>
    </aside>
  )
}
