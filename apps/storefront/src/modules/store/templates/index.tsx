import { Suspense } from "react"

import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import StoreSidebar from "@modules/store/components/store-sidebar"
import { ToolbarClient } from "@modules/store/components/toolbar-client"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  let totalProducts = 0
  try {
    const region = await getRegion(countryCode)
    if (region) {
      const { response } = await listProductsWithSort({
        page: pageNumber,
        queryParams: { limit: 12 },
        sortBy: sort,
        countryCode,
        optionValueIds,
      })
      totalProducts = response.count
    }
  } catch {
    // Backend unavailable — show UI without count
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-caption text-neutral-400">
          <a href={`/${countryCode}`} className="hover:text-brand-orange transition-colors">
            Home
          </a>
          <svg className="w-3 h-3 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-600 font-medium">Building Materials</span>
        </nav>

        {/* Page Header */}
        <div className="pb-6 border-b border-neutral-200">
          <h1 className="text-display-sm lg:text-display-md font-display font-bold text-brand-slate tracking-tight">
            Building Materials
          </h1>
          <p className="text-body-sm text-neutral-500 mt-1.5 max-w-2xl">
            Premium construction materials for residential, commercial and industrial projects.
          </p>
        </div>

        {/* Body */}
        <div className="flex gap-8 pt-6">
          <StoreSidebar />
          <div className="flex-1 min-w-0">
            {/* Compact Toolbar */}
            <Suspense fallback={<div className="h-11 bg-white rounded-xl border border-neutral-200/80 shadow-sm mb-5 animate-pulse" />}>
              <ToolbarClient
                sortBy={sort}
                countryCode={countryCode}
                totalProducts={totalProducts}
              />
            </Suspense>

            {/* Product Grid */}
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
                optionValueIds={optionValueIds}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
