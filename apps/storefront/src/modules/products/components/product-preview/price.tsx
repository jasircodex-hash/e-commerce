import { VariantPrice } from "types/global"

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  const isSale = price.price_type === "sale"
  const discount = price.percentage_diff
    ? Math.round(parseFloat(price.percentage_diff))
    : 0

  return (
    <div className="flex items-baseline gap-1.5">
      {isSale && (
        <>
          <span className="text-body-sm font-bold text-red-600" data-testid="price">
            {price.calculated_price}
          </span>
          <span
            className="text-caption text-neutral-400 line-through"
            data-testid="original-price"
          >
            {price.original_price}
          </span>
          {discount > 0 && (
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
              {discount}% off
            </span>
          )}
        </>
      )}
      {!isSale && (
        <span className="text-body-sm font-bold text-neutral-800" data-testid="price">
          {price.calculated_price}
        </span>
      )}
    </div>
  )
}
