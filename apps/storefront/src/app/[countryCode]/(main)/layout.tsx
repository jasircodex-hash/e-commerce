import { retrieveCart } from "@lib/data/cart"
import Nav from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"

export default async function PageLayout(props: { children: React.ReactNode }) {
  const cart = await retrieveCart().catch(() => null)

  return (
    <>
      <Nav cart={cart} />
      {props.children}
      <Footer />
    </>
  )
}
