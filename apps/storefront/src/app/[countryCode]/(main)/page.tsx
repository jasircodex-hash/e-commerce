import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import Hero from "@modules/home/components/hero"
import CategoryShowcase from "@modules/home/components/category-showcase"
import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedProjects from "@modules/home/components/featured-projects"
import LatestArticles from "@modules/home/components/latest-articles"
import WhyChooseUs from "@modules/home/components/why-choose-us"
import Brands from "@modules/home/components/brands"
import Testimonials from "@modules/home/components/testimonials"
import Newsletter from "@modules/home/components/newsletter"

export const metadata: Metadata = {
  title: "BuildMart - Premium Building Materials & Construction Supplies",
  description:
    "India's trusted destination for premium construction materials. Cement, steel, tiles, plumbing, electrical, and more. Bulk orders, fast delivery, wholesale pricing.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const productCategories = await listCategories()

  let products = null
  if (region) {
    const result = await listProducts({
      countryCode,
      queryParams: { limit: 8 },
    })
    products = result.response.products
  }

  return (
    <>
      <Hero />
      <CategoryShowcase categories={productCategories || []} />
      <FeaturedProducts products={products} />
      <FeaturedProjects />
      <LatestArticles />
      <Brands />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  )
}
