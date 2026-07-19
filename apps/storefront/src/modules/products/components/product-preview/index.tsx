"use client"

import { getProductPrice } from "@lib/util/get-product-price"
import { getProductImage } from "@lib/util/product-images"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  const image = getProductImage(product)
  const categoryHandle = product.categories?.[0]?.handle || ""
  const inStock = product.variants?.some(
    (v) => (v as any).inventory_quantity > 0
  )
  const lowestVariant = product.variants?.length
    ? product.variants.reduce((min, v) => {
        const q = (v as any).inventory_quantity || 0
        return q < ((min as any).inventory_quantity || 0) ? v : min
      }, product.variants[0])
    : null
  const stockQty = lowestVariant
    ? (lowestVariant as any).inventory_quantity || 0
    : 0
  const hasSale =
    cheapestPrice?.price_type === "sale" &&
    cheapestPrice?.original_price_number !== cheapestPrice?.calculated_price_number

  const brand = (product as any).brand || ""
  const unit = (product as any).unit || ""
  const weight = (product as any).weight || ""
  const rating = (product as any).rating || 4.5
  const deliveryEstimate = inStock ? "Delivery Tomorrow" : ""

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-neutral-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="block"
      >
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="aspect-[4/3]">
            <Thumbnail
              thumbnail={image}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {hasSale && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500 text-white shadow-sm">
                SALE
              </span>
            )}
            {isFeatured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-orange text-white shadow-sm">
                BEST SELLER
              </span>
            )}
            {!inStock && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-800/80 text-white shadow-sm">
                OUT OF STOCK
              </span>
            )}
            {inStock && stockQty <= 5 && stockQty > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-sm">
                LOW STOCK
              </span>
            )}
          </div>

          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white hover:text-red-500 transition-all"
              aria-label="Add to wishlist"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white hover:text-brand-blue transition-all"
              aria-label="Quick view"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              className="w-full py-2.5 rounded-lg bg-brand-orange text-white text-body-xs font-semibold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-brand-orange/25"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </LocalizedClientLink>

      <div className="flex flex-col flex-1 p-3.5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
            {categoryHandle || brand || "Construction"}
          </span>
          {inStock && (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="4" />
              </svg>
              In Stock
            </span>
          )}
        </div>

        <LocalizedClientLink href={`/products/${product.handle}`}>
          <h3 className="text-body-sm font-semibold text-neutral-800 leading-snug line-clamp-2 group-hover:text-brand-orange transition-colors duration-200">
            {product.title}
          </h3>
        </LocalizedClientLink>

        {(unit || weight) && (
          <p className="text-caption text-neutral-400 mt-0.5 line-clamp-1">
            {weight}{weight && unit ? " / " : ""}{unit}
          </p>
        )}

        <div className="flex items-center gap-1 mt-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-3 h-3 ${star <= Math.round(rating) ? "text-amber-400" : "text-neutral-200"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-neutral-400 ml-0.5">({product.variants?.length || 0})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          {cheapestPrice ? (
            <PreviewPrice price={cheapestPrice} />
          ) : (
            <span className="text-body-sm font-bold text-neutral-800">Price on Request</span>
          )}
          {deliveryEstimate && (
            <span className="text-[10px] text-emerald-600 font-medium ml-auto whitespace-nowrap">
              {deliveryEstimate}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-neutral-100">
          <span className="trust-badge">
            <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            GST Invoice
          </span>
          <span className="trust-badge">
            <svg className="w-3 h-3 text-brand-blue" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Bulk Orders
          </span>
          <span className="trust-badge">
            <svg className="w-3 h-3 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Genuine
          </span>
        </div>
      </div>
    </div>
  )
}
