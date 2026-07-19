import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "BuildMart - Premium Building Materials & Construction Supplies",
    template: "%s | BuildMart",
  },
  description:
    "India's trusted destination for premium construction materials. Cement, steel, tiles, plumbing, electrical, and more. Bulk orders, fast delivery, wholesale pricing.",
  openGraph: {
    title: "BuildMart - Premium Building Materials & Construction Supplies",
    description:
      "India's trusted destination for premium construction materials. Cement, steel, tiles, plumbing, electrical, and more.",
    type: "website",
    siteName: "BuildMart",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative min-h-screen">{props.children}</main>
      </body>
    </html>
  )
}
