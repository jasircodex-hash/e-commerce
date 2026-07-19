import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
    optionValueIds,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-32 h-32 rounded-2xl bg-neutral-100 flex items-center justify-center mb-6">
          <svg className="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-display-xs font-bold text-neutral-800 mb-2">No products found</h3>
        <p className="text-body-sm text-neutral-500 text-center max-w-md mb-6">
          We couldn&apos;t find any products matching your filters. Try adjusting your search criteria.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={`/${countryCode}/store`}
            className="btn-primary text-body-sm"
          >
            Clear Filters
          </a>
          <a
            href={`/${countryCode}`}
            className="btn-secondary text-body-sm"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        data-testid="products-list"
      >
        {products.map((p, idx) => (
          <div
            key={p.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${(idx % 12) * 40}ms`, animationFillMode: "backwards" }}
          >
            <ProductPreview product={p} region={region} isFeatured={idx < 3} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
          countryCode={countryCode}
        />
      )}
    </>
  )
}
