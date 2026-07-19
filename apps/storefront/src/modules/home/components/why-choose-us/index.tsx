"use client"

import {
  PackageIcon,
  TruckIcon,
  DocumentTextIcon,
  ShieldIcon,
  HeadphonesIcon,
} from "@modules/common/icons/icons"

const features = [
  {
    icon: PackageIcon,
    title: "Bulk Orders",
    description: "Order in bulk and save more with our special trade pricing",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Pan-India delivery network with real-time tracking",
  },
  {
    icon: DocumentTextIcon,
    title: "GST Billing",
    description: "Full GST invoices for business tax benefits",
  },
  {
    icon: ShieldIcon,
    title: "Trusted Brands",
    description: "Authorized dealers of India's top construction brands",
  },
  {
    icon: ShieldIcon,
    title: "Secure Payments",
    description: "100% secure payment gateway with multiple options",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Expert support team available round the clock",
  },
]

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div className="content-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title">Why Choose BuildMart?</h2>
          <p className="section-subtitle mx-auto">
            India&apos;s trusted construction material partner with unmatched
            quality, service, and value
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover group p-6 md:p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-orange/10 text-brand-orange mb-5 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-heading-lg text-brand-slate mb-2">
                {feature.title}
              </h3>
              <p className="text-body-md text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
