"use client"

import { XIcon, HeartIcon } from "@modules/common/icons/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect } from "react"

const WishlistModal = ({
  open,
  onClose,
  items,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  items: { id: string; title: string; handle: string; thumbnail?: string | null }[]
  onRemove: (id: string) => void
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-heading-sm font-display font-bold text-brand-slate flex items-center gap-2">
            <HeartIcon className="w-5 h-5 text-red-500" />
            Wishlist
            {items.length > 0 && (
              <span className="text-body-sm font-normal text-neutral-400">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {items.length > 0 ? (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border border-neutral-100">
                <LocalizedClientLink
                  href={`/products/${item.handle}`}
                  onClick={onClose}
                  className="flex-1 min-w-0"
                >
                  <p className="text-body-sm font-medium text-neutral-800 truncate hover:text-brand-orange transition-colors">
                    {item.title}
                  </p>
                </LocalizedClientLink>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-caption text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <HeartIcon className="w-12 h-12 text-neutral-200 mb-4" />
            <p className="text-body-lg font-medium text-neutral-600 mb-1">Your wishlist is empty</p>
            <p className="text-body-sm text-neutral-400 mb-6 text-center">
              Save your favorite products for later.
            </p>
            <LocalizedClientLink href="/store">
              <button
                className="inline-flex items-center justify-center rounded-md h-10 px-6 bg-brand-orange text-white font-medium hover:bg-brand-orange/90 transition-colors"
                onClick={onClose}
              >
                Browse Products
              </button>
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistModal
