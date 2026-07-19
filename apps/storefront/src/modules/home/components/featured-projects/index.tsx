import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightIcon } from "@modules/common/icons/icons"

const projects = [
  {
    title: "Green Valley Residency",
    category: "Residential",
    location: "Whitefield, Bangalore",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    title: "Skyline Tech Park",
    category: "Commercial",
    location: "HSR Layout, Bangalore",
    image: "https://images.pexels.com/photos/2092516/pexels-photo-2092516.jpeg",
  },
  {
    title: "Riverside Villa Complex",
    category: "Luxury Housing",
    location: "Pune, Maharashtra",
    image: "https://images.pexels.com/photos/2449454/pexels-photo-2449454.jpeg",
  },
  {
    title: "Grand Central Mall",
    category: "Commercial",
    location: "MG Road, Bangalore",
    image: "https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg",
  },
]

const FeaturedProjects = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-orange font-semibold text-body-sm uppercase tracking-wider mb-2">
              Our Work
            </p>
            <h2 className="text-heading-xl font-display font-bold text-brand-slate">
              Featured Projects
            </h2>
            <p className="text-body-md text-neutral-500 mt-2 max-w-2xl">
              Explore some of the landmark projects built with materials supplied by BuildMart.
            </p>
          </div>
          <LocalizedClientLink
            href="/projects"
            className="hidden md:flex items-center gap-1.5 text-body-sm font-medium text-brand-orange hover:text-brand-orange/80 transition-colors"
          >
            View All Projects
            <ChevronRightIcon className="w-4 h-4" />
          </LocalizedClientLink>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group relative rounded-xl overflow-hidden bg-neutral-100 aspect-[4/5]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-caption font-medium mb-2">
                  {project.category}
                </span>
                <h3 className="text-body-lg font-bold text-white">{project.title}</h3>
                <p className="text-body-sm text-white/70 mt-1">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
        <LocalizedClientLink
          href="/projects"
          className="md:hidden flex items-center justify-center gap-1.5 mt-8 text-body-sm font-medium text-brand-orange hover:text-brand-orange/80 transition-colors"
        >
          View All Projects
          <ChevronRightIcon className="w-4 h-4" />
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default FeaturedProjects
