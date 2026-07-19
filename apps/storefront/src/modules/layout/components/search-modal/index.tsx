"use client"

import { XIcon, SearchIcon } from "@modules/common/icons/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect, useRef, useCallback } from "react"

const popularCategories = [
  { name: "Cement & Concrete", handle: "cement-concrete" },
  { name: "Steel Reinforcement", handle: "steel-reinforcement" },
  { name: "Tiles & Flooring", handle: "tiles-flooring" },
  { name: "Plumbing", handle: "plumbing" },
  { name: "Electrical", handle: "electrical" },
  { name: "Paints & Finishes", handle: "paints-finishes" },
]

const SearchModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery("")
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 left-0 right-0 bg-white shadow-xl">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 bg-neutral-50 rounded-xl border border-neutral-200 px-4 py-3 focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20 transition-all">
            <SearchIcon className="w-5 h-5 text-neutral-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for building materials, brands, categories..."
              className="flex-1 bg-transparent text-body-lg text-neutral-800 placeholder:text-neutral-400 outline-none border-0"
            />
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-md hover:bg-neutral-200 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6">
            {query.trim().length === 0 ? (
              <>
                <p className="text-body-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Popular Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularCategories.map((cat) => (
                    <LocalizedClientLink
                      key={cat.handle}
                      href={`/categories/${cat.handle}`}
                      onClick={onClose}
                      className="px-4 py-2 rounded-full bg-neutral-100 text-body-sm text-neutral-600 hover:bg-brand-orange/10 hover:text-brand-orange hover:border-brand-orange/30 transition-all border border-transparent"
                    >
                      {cat.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-body-sm text-neutral-400 py-8 text-center">
                Press Enter to search for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
