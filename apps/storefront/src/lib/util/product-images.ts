const CATEGORY_IMAGES: Record<string, string[]> = {
  cement: [
    "https://images.unsplash.com/photo-1617953142848-8b3c6c7f3a1a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1614094082867-6a05f8bb3dba?w=400&h=300&fit=crop",
  ],
  "steel-tmt": [
    "https://images.unsplash.com/photo-1587295182851-8d0a7e8c6f9b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1590038767622-0ae143e8b77e?w=400&h=300&fit=crop",
  ],
  bricks: [
    "https://images.unsplash.com/photo-1617953142848-8b3c6c7f3a1a?w=400&h=300&fit=crop",
  ],
  tiles: [
    "https://images.unsplash.com/photo-1581852549781-0f4e1c3e2c4d?w=400&h=300&fit=crop",
  ],
  paint: [
    "https://images.unsplash.com/photo-1562259920-36c6d1f1e9c1?w=400&h=300&fit=crop",
  ],
  plumbing: [
    "https://images.unsplash.com/photo-1581578731542-c1c9b5e6b8b8?w=400&h=300&fit=crop",
  ],
  electrical: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  ],
  roofing: [
    "https://images.unsplash.com/photo-1590038767622-0ae143e8b77e?w=400&h=300&fit=crop",
  ],
  doors: [
    "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=400&h=300&fit=crop",
  ],
  windows: [
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=300&fit=crop",
  ],
  hardware: [
    "https://images.unsplash.com/photo-1599658880436-c45a4b4b1b1b?w=400&h=300&fit=crop",
  ],
  tools: [
    "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop",
  ],
  safety: [
    "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&h=300&fit=crop",
  ],
  "water-tanks": [
    "https://images.unsplash.com/photo-1581578731542-c1c9b5e6b8b8?w=400&h=300&fit=crop",
  ],
  chemicals: [
    "https://images.unsplash.com/photo-1562259920-36c6d1f1e9c1?w=400&h=300&fit=crop",
  ],
  "marble-granite": [
    "https://images.unsplash.com/photo-1581852549781-0f4e1c3e2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400&h=300&fit=crop",
  ],
  sand: [
    "https://images.unsplash.com/photo-1589935437577-1ef5c4a8b9a0?w=400&h=300&fit=crop",
  ],
  "ready-mix": [
    "https://images.unsplash.com/photo-1614094082867-6a05f8bb3dba?w=400&h=300&fit=crop",
  ],
}

const BRAND_IMAGE_MAP: Record<string, string> = {
  ultratech: "https://images.unsplash.com/photo-1617953142848-8b3c6c7f3a1a?w=400&h=300&fit=crop",
  "jsw-steel": "https://images.unsplash.com/photo-1587295182851-8d0a7e8c6f9b?w=400&h=300&fit=crop",
  "tata-steel": "https://images.unsplash.com/photo-1587295182851-8d0a7e8c6f9b?w=400&h=300&fit=crop",
  kajaria: "https://images.unsplash.com/photo-1581852549781-0f4e1c3e2c4d?w=400&h=300&fit=crop",
  "asian-paints": "https://images.unsplash.com/photo-1562259920-36c6d1f1e9c1?w=400&h=300&fit=crop",
  astral: "https://images.unsplash.com/photo-1581578731542-c1c9b5e6b8b8?w=400&h=300&fit=crop",
  havells: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  centuryply: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=400&h=300&fit=crop",
  jaquar: "https://images.unsplash.com/photo-1581578731542-c1c9b5e6b8b8?w=400&h=300&fit=crop",
}

export function getProductImage(product: {
  handle?: string
  thumbnail?: string | null
  categories?: { handle?: string }[] | null
  collection?: { handle?: string } | null
  brand?: string
}): string | null {
  if (product.thumbnail) return product.thumbnail

  const handle = product.handle || ""

  for (const [brand, url] of Object.entries(BRAND_IMAGE_MAP)) {
    if (handle.toLowerCase().includes(brand)) return url
  }

  const categoryHandle = product.categories?.[0]?.handle || product.collection?.handle || ""
  for (const [cat, urls] of Object.entries(CATEGORY_IMAGES)) {
    if (categoryHandle.toLowerCase().includes(cat)) return urls[0]
  }

  return null
}

export function getCategoryColor(categoryHandle?: string): string {
  const colors: Record<string, string> = {
    cement: "bg-slate-200",
    "steel-tmt": "bg-amber-100",
    bricks: "bg-red-100",
    tiles: "bg-sky-100",
    paints: "bg-rose-100",
    plumbing: "bg-cyan-100",
    electrical: "bg-yellow-100",
    roofing: "bg-orange-100",
    doors: "bg-stone-100",
    windows: "bg-blue-100",
    hardware: "bg-zinc-100",
    tools: "bg-lime-100",
    safety: "bg-green-100",
  }
  if (!categoryHandle) return "bg-neutral-100"
  for (const [key, color] of Object.entries(colors)) {
    if (categoryHandle.includes(key)) return color
  }
  return "bg-neutral-100"
}
