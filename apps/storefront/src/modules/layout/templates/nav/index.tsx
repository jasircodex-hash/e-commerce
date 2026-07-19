"use client"

import { useEffect, useState, useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BuildMartLogo from "@modules/common/icons/buildmart-logo"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import SearchModal from "@modules/layout/components/search-modal"
import WishlistModal from "@modules/layout/components/wishlist-modal"
import {
  SearchIcon,
  HeartIcon,
  UserIcon,
  ChevronDownIcon,
  MenuIcon,
  XIcon,
} from "@modules/common/icons/icons"

const categories = [
  { name: "Cement & Concrete", handle: "cement-concrete" },
  { name: "Steel Reinforcement", handle: "steel-reinforcement" },
  { name: "Tiles & Flooring", handle: "tiles-flooring" },
  { name: "Bricks & Blocks", handle: "bricks-blocks" },
  { name: "Aggregates & Sand", handle: "aggregates-sand" },
  { name: "Pipes & Fittings", handle: "pipes-fittings" },
  { name: "Plumbing", handle: "plumbing" },
  { name: "Electrical", handle: "electrical" },
  { name: "Paints & Finishes", handle: "paints-finishes" },
  { name: "Timber & Plywood", handle: "timber-plywood" },
  { name: "Hardware & Fasteners", handle: "hardware-fasteners" },
  { name: "Roofing", handle: "roofing" },
  { name: "Glass & Windows", handle: "glass-windows" },
  { name: "Safety Equipment", handle: "safety-equipment" },
  { name: "Tools & Machinery", handle: "tools-machinery" },
  { name: "Doors & Windows", handle: "doors-windows" },
]

export default function Nav({ cart }: { cart?: HttpTypes.StoreCart | null }) {

  const navLinks = [
    { name: "Products", href: "/store" },
    { name: "Brands", href: "/brands" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<
    { id: string; title: string; handle: string; thumbnail?: string | null }[]
  >([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("buildmart_wishlist")
        if (stored) setWishlistItems(JSON.parse(stored))
      } catch { }
    }
  }, [])

  const removeWishlistItem = (id: string) => {
    const updated = wishlistItems.filter((item) => item.id !== id)
    setWishlistItems(updated)
    localStorage.setItem("buildmart_wishlist", JSON.stringify(updated))
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 inset-x-0 z-50 h-14 md:h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-shadow duration-300 ${scrolled ? "shadow-nav shadow-neutral-200/80" : ""
          }`}
      >
        <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 flex-shrink-0">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <BuildMartLogo
                size={32}
                className="transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-heading-md font-display font-bold text-brand-slate">
                BuildMart
              </span>
            </LocalizedClientLink>
          </div>

          <div className="hidden md:flex items-center gap-0.5 h-full">
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 text-body-sm font-medium rounded-md transition-colors duration-200 ${megaMenuOpen
                  ? "text-brand-orange bg-brand-orange/5"
                  : "text-neutral-600 hover:text-brand-orange hover:bg-neutral-50"
                  }`}
              >
                Categories
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`absolute top-full left-0 w-[592px] bg-white rounded-lg shadow-dropdown border border-neutral-200 p-5 transition-all duration-200 origin-top-left ${megaMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
              >
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <LocalizedClientLink
                      key={cat.handle}
                      href={`/categories/${cat.handle}`}
                      className="group flex items-center gap-3 p-2.5 rounded-md hover:bg-neutral-50 transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors duration-200">
                        <span className="text-body-sm font-bold text-brand-orange">
                          {cat.name[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-body-sm font-medium text-neutral-800 group-hover:text-brand-orange transition-colors duration-200 truncate">
                          {cat.name}
                        </p>
                        <p className="text-caption text-neutral-400">
                          Shop now
                        </p>
                      </div>
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <LocalizedClientLink
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-body-sm font-medium text-neutral-600 hover:text-brand-orange transition-colors duration-200 rounded-md hover:bg-neutral-50"
              >
                {link.name}
              </LocalizedClientLink>
            ))}
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            <button
              className="p-2 text-neutral-500 hover:text-brand-orange transition-colors duration-200 rounded-md hover:bg-neutral-50"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            <button
              className="relative p-2 text-neutral-500 hover:text-brand-orange transition-colors duration-200 rounded-md hover:bg-neutral-50 hidden sm:flex"
              aria-label="Wishlist"
              onClick={() => setWishlistOpen(true)}
            >
              <HeartIcon className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {wishlistItems.length > 9 ? "9+" : wishlistItems.length}
                </span>
              )}
            </button>
            <LocalizedClientLink
              href="/account"
              className="p-2 text-neutral-500 hover:text-brand-orange transition-colors duration-200 rounded-md hover:bg-neutral-50 hidden sm:flex"
              aria-label="Account"
            >
              <UserIcon className="w-5 h-5" />
            </LocalizedClientLink>
            <CartDropdown cart={cart} />
            <button
              className="p-2 text-neutral-500 hover:text-brand-orange transition-colors duration-200 rounded-md hover:bg-neutral-50 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white md:hidden animate-fade-in">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-14 border-b border-neutral-200 flex-shrink-0">
              <LocalizedClientLink
                href="/"
                className="flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <BuildMartLogo size={28} />
                <span className="text-heading-md font-display font-bold text-brand-slate">
                  BuildMart
                </span>
              </LocalizedClientLink>
              <button
                className="p-2 text-neutral-500 hover:text-brand-orange transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="mb-8">
                <h3 className="text-body-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 px-3">
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.map((cat) => (
                    <LocalizedClientLink
                      key={cat.handle}
                      href={`/categories/${cat.handle}`}
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-neutral-50 transition-colors duration-200"
                      onClick={closeMobileMenu}
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-body-xs font-bold text-brand-orange">
                          {cat.name[0]}
                        </span>
                      </div>
                      <span className="text-body-sm font-medium text-neutral-700">
                        {cat.name}
                      </span>
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>

              <div className="space-y-0.5">
                {[{ name: "Home", href: "/" }, ...navLinks].map((link) => (
                  <LocalizedClientLink
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-3.5 text-body-lg font-medium text-neutral-700 hover:text-brand-orange hover:bg-neutral-50 rounded-md transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </LocalizedClientLink>
                ))}
              </div>

              <div className="my-6 border-t border-neutral-100" />

              <div className="space-y-1">
                <LocalizedClientLink
                  href="/account"
                  className="flex items-center gap-3 px-3 py-3 text-body-sm font-medium text-neutral-700 hover:text-brand-orange hover:bg-neutral-50 rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <UserIcon className="w-5 h-5 text-neutral-400" />
                  My Account
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/wishlist"
                  className="flex items-center gap-3 px-3 py-3 text-body-sm font-medium text-neutral-700 hover:text-brand-orange hover:bg-neutral-50 rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <HeartIcon className="w-5 h-5 text-neutral-400" />
                  Wishlist
                </LocalizedClientLink>
                <button className="flex items-center gap-3 px-3 py-3 text-body-sm font-medium text-neutral-700 hover:text-brand-orange hover:bg-neutral-50 rounded-md transition-colors duration-200 w-full text-left">
                  <SearchIcon className="w-5 h-5 text-neutral-400" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <WishlistModal
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlistItems}
        onRemove={removeWishlistItem}
      />
    </>
  )
}
