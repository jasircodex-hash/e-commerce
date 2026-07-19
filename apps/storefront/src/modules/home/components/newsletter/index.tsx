"use client"

const Newsletter = () => {
  return (
    <section className="relative py-16 md:py-24 bg-brand-slate overflow-hidden">
      <div className="absolute inset-0 bg-orange-glow" />

      <div className="content-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display-xs sm:text-display-sm font-display font-bold text-white mb-4">
            Stay Ahead in Construction
          </h2>
          <p className="text-body-lg text-neutral-300 mb-8">
            Get the latest prices, product launches, and construction tips
            delivered to your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1 bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:bg-white/15"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>

          <p className="text-body-xs text-neutral-400 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
