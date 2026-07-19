import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"

import ProductActionsWrapper from "./product-actions-wrapper"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const StarRating = ({ rating = 4.5 }: { rating?: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating)
    const half = !filled && i < rating
    return { filled, half }
  })
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${star.filled ? "text-yellow-400" : star.half ? "text-yellow-300" : "text-neutral-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-body-sm text-neutral-500 ml-1.5 font-medium">{rating}</span>
    </div>
  )
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const category = product.collection
  const brandName = product.material || "BuildMart Pro"
  const sku = product.variants?.[0]?.sku || ""
  const totalInventory =
    product.variants?.reduce(
      (sum, v) => sum + (v.inventory_quantity || 0),
      0
    ) ?? 0
  const stockStatus =
    totalInventory > 10
      ? "in-stock"
      : totalInventory > 0
        ? "low-stock"
        : "out-of-stock"

  const { cheapestPrice } = getProductPrice({ product })
  const basePriceNum = cheapestPrice?.calculated_price_number ?? 0

  const bulkTiers = cheapestPrice
    ? [
        {
          label: "1 - 10",
          price: cheapestPrice.calculated_price,
        },
        {
          label: "11 - 50",
          price: (basePriceNum * 0.92).toFixed(2),
        },
        {
          label: "51+",
          price: (basePriceNum * 0.85).toFixed(2),
        },
      ]
    : []

  return (
    <>
      <div className="bg-white border-b border-neutral-100">
        <div className="content-container py-4 lg:py-6">
          {/* Breadcrumb */}
          <nav className="mb-5" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-body-sm text-neutral-500 flex-wrap">
              <li>
                <LocalizedClientLink
                  href="/"
                  className="hover:text-brand-orange transition-colors duration-200"
                >
                  Home
                </LocalizedClientLink>
              </li>
              <li className="text-neutral-300 select-none">/</li>
              <li>
                {category ? (
                  <LocalizedClientLink
                    href={`/collections/${category.handle}`}
                    className="hover:text-brand-orange transition-colors duration-200"
                  >
                    {category.title}
                  </LocalizedClientLink>
                ) : (
                  <span className="text-neutral-400">Products</span>
                )}
              </li>
              <li className="text-neutral-300 select-none">/</li>
              <li className="text-neutral-800 font-medium truncate max-w-[180px] sm:max-w-[280px]">
                {product.title}
              </li>
            </ol>
          </nav>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16">
            {/* LEFT COLUMN — Image Gallery */}
            <div className="w-full lg:w-[60%] lg:sticky lg:top-28 lg:self-start">
              <ImageGallery images={images} />
            </div>

            {/* RIGHT COLUMN — Product Info Panel */}
            <div className="w-full lg:w-[40%] mt-6 lg:mt-0 flex flex-col gap-y-6">
              {/* Category Badge */}
              {category && (
                <div>
                  <span className="badge-orange text-caption font-semibold uppercase tracking-wider">
                    {category.title}
                  </span>
                </div>
              )}

              {/* Product Title */}
              <h1
                className="text-display-xs font-display font-bold text-brand-slate leading-tight"
                data-testid="product-title"
              >
                {product.title}
              </h1>

              {/* Brand + Rating */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center text-body-sm font-bold text-brand-orange flex-shrink-0">
                    {brandName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-body-xs text-neutral-400 leading-none">Brand</p>
                    <p className="text-body-sm font-medium text-neutral-700">{brandName}</p>
                  </div>
                </div>
                <StarRating rating={4.5} />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                {cheapestPrice ? (
                  <>
                    <span className="text-display-sm font-bold text-brand-slate">
                      {cheapestPrice.calculated_price}
                    </span>
                    {cheapestPrice.price_type === "sale" && cheapestPrice.original_price && (
                      <>
                        <span className="text-heading-lg text-neutral-400 line-through">
                          {cheapestPrice.original_price}
                        </span>
                        <span className="badge-green text-caption font-semibold">
                          {cheapestPrice.percentage_diff}% OFF
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-display-sm font-bold text-neutral-300">
                    Price on request
                  </span>
                )}
              </div>

              {/* Stock Status + SKU */}
              <div className="flex items-center gap-4 flex-wrap">
                {stockStatus === "in-stock" && (
                  <span className="badge-green flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    In Stock
                  </span>
                )}
                {stockStatus === "low-stock" && (
                  <span className="badge bg-red-50 text-red-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                    Low Stock — Only {totalInventory} left
                  </span>
                )}
                {stockStatus === "out-of-stock" && (
                  <span className="badge bg-neutral-100 text-neutral-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
                    Out of Stock
                  </span>
                )}
                {sku && (
                  <span className="text-body-sm text-neutral-400">
                    SKU: <span className="font-mono text-neutral-500">{sku}</span>
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-100" />

              {/* Quantity Selector */}
              <div>
                <label className="text-body-sm font-medium text-neutral-700 mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center w-fit border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-brand-orange hover:bg-neutral-50 transition-colors duration-150 text-body-lg font-medium"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    className="w-16 h-10 text-center text-body-sm font-medium text-neutral-800 border-x border-neutral-200 bg-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-brand-orange hover:bg-neutral-50 transition-colors duration-150 text-body-lg font-medium"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Actions — Variant Selector + Add to Cart */}
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>

              {/* Bulk Pricing Tier Table */}
              {cheapestPrice && bulkTiers.length > 0 && (
                <div className="bg-neutral-50 rounded-xl border border-neutral-100 overflow-hidden">
                  <div className="px-4 py-2.5 bg-neutral-100/60 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-body-sm font-semibold text-neutral-700">
                        Bulk Pricing
                      </span>
                    </div>
                  </div>
                  <table className="w-full text-body-sm">
                    <thead>
                      <tr className="border-b border-neutral-100">
                        <th className="px-4 py-2.5 text-left font-medium text-neutral-500">
                          Quantity
                        </th>
                        <th className="px-4 py-2.5 text-right font-medium text-neutral-500">
                          Price per unit
                        </th>
                        <th className="px-4 py-2.5 text-right font-medium text-neutral-500">
                          Savings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkTiers.map((tier, idx) => {
                        const savings =
                          idx === 0
                            ? "-"
                            : `${Math.round(
                                (1 -
                                  parseFloat(tier.price) / basePriceNum) *
                                  100
                              )}%`
                        const isBestValue = idx === bulkTiers.length - 1
                        return (
                          <tr
                            key={tier.label}
                            className={`border-b border-neutral-50 last:border-b-0 ${
                              isBestValue ? "bg-brand-orange/[0.03]" : ""
                            }`}
                          >
                            <td className="px-4 py-2.5 text-neutral-700 font-medium">
                              {tier.label}
                              {isBestValue && (
                                <span className="ml-2 text-caption font-semibold text-emerald-600">
                                  Best value
                                </span>
                              )}
                            </td>
                            <td
                              className={`px-4 py-2.5 text-right font-semibold ${
                                isBestValue
                                  ? "text-brand-orange"
                                  : "text-neutral-800"
                              }`}
                            >
                              {cheapestPrice.currency_code === "EUR"
                                ? `€${tier.price}`
                                : `$${tier.price}`}
                            </td>
                            <td className="px-4 py-2.5 text-right text-emerald-600 font-medium">
                              {savings}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-neutral-200 rounded-xl text-neutral-600 font-medium text-body-sm hover:border-red-200 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200 active:scale-[0.98] group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                Add to Wishlist
              </button>

              {/* ProductOnboardingCta */}
              <ProductOnboardingCta />
            </div>
          </div>
        </div>
      </div>

      {/* Below the Fold — Tabs, Specs & Downloads */}
      <div className="bg-surface-secondary">
        <div className="content-container py-12 lg:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Product Tabs (accordion with Product Information & Shipping) */}
            <ProductTabs product={product} />

            {/* Full Description */}
            <div className="mt-10" data-testid="product-description-section">
              <h3 className="text-heading-lg font-display font-bold text-brand-slate mb-5">
                Full Description
              </h3>
              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-card">
                <ProductInfo product={product} />
              </div>
            </div>

            {/* Specifications Table */}
            <div className="mt-10">
              <h3 className="text-heading-lg font-display font-bold text-brand-slate mb-5">
                Specifications
              </h3>
              <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden shadow-card">
                <table className="w-full text-body-sm">
                  <tbody>
                    {[
                      { label: "Dimensions", value: product.length && product.width && product.height ? `${product.length} × ${product.width} × ${product.height}` : "-" },
                      { label: "Weight", value: product.weight ? `${product.weight} g` : "-" },
                      { label: "Material", value: product.material || "-" },
                      { label: "Brand", value: brandName },
                      { label: "Model / SKU", value: sku || "-" },
                      { label: "Origin", value: product.origin_country || "-" },
                    ].map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={i % 2 === 0 ? "bg-neutral-50/50" : "bg-white"}
                      >
                        <td className="px-5 py-3 font-medium text-neutral-600 w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-5 py-3 text-neutral-800">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Downloads Section */}
            <div className="mt-10">
              <h3 className="text-heading-lg font-display font-bold text-brand-slate mb-5">
                Downloads
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Product Data Sheet",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    ),
                  },
                  {
                    title: "Installation Manual",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    ),
                  },
                  {
                    title: "Safety Data Sheet",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    ),
                  },
                  {
                    title: "Compliance Certificate",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    ),
                  },
                ].map((doc) => (
                  <a
                    key={doc.title}
                    href="#"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-100 hover:border-brand-orange/30 hover:shadow-card-hover transition-all duration-200 group shadow-card"
                  >
                    <div className="w-11 h-11 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors duration-200">
                      <svg
                        className="w-5 h-5 text-brand-orange"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        {doc.icon}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-neutral-800 group-hover:text-brand-orange transition-colors duration-200 truncate">
                        {doc.title}
                      </p>
                      <p className="text-caption text-neutral-400">PDF &middot; 2.4 MB</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-neutral-300 group-hover:text-brand-orange transition-colors duration-200 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="content-container py-12 lg:py-16">
        <h2 className="section-title mb-8">Related Products</h2>
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
