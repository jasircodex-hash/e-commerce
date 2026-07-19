"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function ToolbarClient({
  sortBy,
  countryCode,
  totalProducts,
}: {
  sortBy: string
  countryCode: string
  totalProducts?: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("sortBy", value)
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return (
    <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-neutral-200/80 shadow-sm px-4 py-2.5">
      <span className="text-body-sm font-medium text-neutral-600">
        Showing{" "}
        <span className="text-neutral-800">{totalProducts ?? "..."}</span>{" "}
        Product{totalProducts !== 1 ? "s" : ""}
      </span>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-caption text-neutral-400">Sort:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => updateSort(e.target.value)}
              className="appearance-none bg-transparent text-body-sm font-medium text-neutral-700 pr-6 py-1 cursor-pointer focus:outline-none hover:text-brand-orange transition-colors"
              aria-label="Sort products"
            >
              <option value="created_at">Latest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <svg
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-1 border-l border-neutral-200 pl-3">
          <button
            type="button"
            className="p-1.5 rounded-md text-brand-orange bg-brand-orange/5 hover:bg-brand-orange/10 transition-colors"
            aria-label="Grid view"
            title="Grid view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md text-neutral-300 hover:text-brand-orange hover:bg-brand-orange/5 transition-colors"
            aria-label="List view"
            title="List view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="lg:hidden p-1.5 rounded-md text-neutral-500 hover:text-brand-orange hover:bg-brand-orange/5 transition-colors border border-neutral-200"
          aria-label="Filter"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
