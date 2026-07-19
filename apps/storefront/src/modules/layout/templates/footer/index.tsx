'use client'

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BuildMartLogo from "@modules/common/icons/buildmart-logo"

const categories = [
  { name: "Cement & Concrete", href: "/categories/cement-concrete" },
  { name: "Steel & TMT", href: "/categories/steel-tmt" },
  { name: "Tiles & Flooring", href: "/categories/tiles-flooring" },
  { name: "Bricks & Blocks", href: "/categories/bricks-blocks" },
  { name: "Plumbing", href: "/categories/plumbing" },
  { name: "Electrical", href: "/categories/electrical" },
  { name: "Pipes & Fittings", href: "/categories/pipes-fittings" },
  { name: "Paints", href: "/categories/paints" },
]

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Brands", href: "/brands" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
]

const customerService = [
  { name: "My Account", href: "/account" },
  { name: "Order Tracking", href: "/order-tracking" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Returns", href: "/returns" },
  { name: "FAQ", href: "/faq" },
  { name: "Bulk Orders", href: "/bulk-orders" },
  { name: "GST Info", href: "/gst-info" },
]

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/buildmart" },
  { name: "Instagram", href: "https://instagram.com/buildmart" },
  { name: "LinkedIn", href: "https://linkedin.com/company/buildmart" },
  { name: "YouTube", href: "https://youtube.com/@buildmart" },
]

const paymentMethods = ["Visa", "Mastercard", "UPI", "Net Banking", "COD"]

export default function Footer() {
  return (
    <footer className="bg-brand-slate text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:py-16 border-b border-white/10">
          {/* Column 1 - Brand Info */}
          <div className="flex flex-col gap-4">
            <LocalizedClientLink href="/" className="flex items-center gap-3 group">
              <BuildMartLogo size={40} className="group-hover:scale-105 transition-transform duration-300" />
              <span className="text-heading-lg font-display font-bold text-white">BuildMart</span>
            </LocalizedClientLink>
            <p className="text-body-sm text-neutral-400 leading-relaxed">
              Everything You Need for Construction
            </p>
            <div className="flex flex-col gap-2 text-body-sm text-neutral-400 mt-1">
              <a href="tel:+911800123BUILD" className="hover:text-brand-orange transition-colors duration-200">
                +91 1800-123-BUILD
              </a>
              <a href="mailto:info@buildmart.in" className="hover:text-brand-orange transition-colors duration-200">
                info@buildmart.in
              </a>
              <p className="text-neutral-400 leading-relaxed mt-1">
                42, Sector 14, Industrial Area,<br />
                Gurugram, Haryana 122001, India
              </p>
            </div>
          </div>

          {/* Column 2 - Categories */}
          <div>
            <h3 className="text-heading-md font-display font-semibold text-white mb-4">Categories</h3>
            <ul className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <LocalizedClientLink
                    href={cat.href}
                    className="text-body-sm text-neutral-400 hover:text-brand-orange hover:translate-x-0.5 transition-all duration-200 inline-block"
                  >
                    {cat.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="text-heading-md font-display font-semibold text-white mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-body-sm text-neutral-400 hover:text-brand-orange hover:translate-x-0.5 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Customer Service */}
          <div>
            <h3 className="text-heading-md font-display font-semibold text-white mb-4">Customer Service</h3>
            <ul className="flex flex-col gap-2.5">
              {customerService.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-body-sm text-neutral-400 hover:text-brand-orange hover:translate-x-0.5 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section - Newsletter + Social */}
        <div className="border-y border-white/10 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Newsletter */}
            <div className="w-full lg:w-auto">
              <h3 className="text-heading-md font-display font-semibold text-white mb-3">Stay Updated</h3>
              <p className="text-body-sm text-neutral-400 mb-4">
                Get the latest deals and new products delivered to your inbox.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-72 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-body-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-body-sm rounded-lg transition-all duration-200 active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="w-full lg:w-auto">
              <h3 className="text-heading-md font-display font-semibold text-white mb-3">Follow Us</h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-neutral-400 hover:text-brand-orange transition-colors duration-200"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright + Payments */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-body-xs text-neutral-500">
            &copy; {new Date().getFullYear()} BuildMart. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-body-xs text-neutral-500">
            <span className="hidden sm:inline mr-1">We accept</span>
            {paymentMethods.map((method) => (
              <span key={method} className="hover:text-neutral-300 transition-colors duration-200">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
