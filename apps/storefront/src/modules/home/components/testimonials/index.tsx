"use client"

import { QuoteIcon } from "@modules/common/icons/icons"

const testimonials = [
  {
    quote:
      "BuildMart delivered 500 bags of cement to our site within 24 hours. The quality was exceptional and the pricing was the best we found.",
    name: "Rajesh Kumar",
    title: "M/s Kumar Constructions, Bangalore",
    initials: "RK",
    color: "bg-brand-orange",
  },
  {
    quote:
      "We've been sourcing all our steel and plumbing materials from BuildMart for over a year now. Consistent quality, timely delivery, and excellent support.",
    name: "Priya Sharma",
    title: "Architect, Mumbai",
    initials: "PS",
    color: "bg-brand-blue",
  },
  {
    quote:
      "The GST billing and bulk discount system saved us over 15% on our last project. Highly recommend for any serious contractor.",
    name: "Amit Singh",
    title: "Singh Builders & Developers, Delhi",
    initials: "AS",
    color: "bg-emerald-600",
  },
]

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div className="content-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Hear from contractors, architects, and builders who trust BuildMart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="card-hover p-6 md:p-8 flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <QuoteIcon className="w-8 h-8 text-brand-orange mb-4" />

              <p className="text-body-md text-neutral-600 italic leading-relaxed mb-6 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <div
                  className={`w-11 h-11 rounded-full ${item.color} flex items-center justify-center text-white text-body-sm font-semibold flex-shrink-0`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-body-sm font-semibold text-brand-slate">
                    {item.name}
                  </p>
                  <p className="text-body-xs text-neutral-500">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
