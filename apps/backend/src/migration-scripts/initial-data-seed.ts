import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductOptionsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"

const CATEGORIES = [
  { name: "Cement", handle: "cement" },
  { name: "Steel & TMT", handle: "steel-tmt" },
  { name: "Bricks & Blocks", handle: "bricks-blocks" },
  { name: "Sand & Aggregates", handle: "sand-aggregates" },
  { name: "Ready Mix Concrete", handle: "ready-mix-concrete" },
  { name: "Roofing", handle: "roofing" },
  { name: "Tiles", handle: "tiles" },
  { name: "Marble & Granite", handle: "marble-granite" },
  { name: "Paints", handle: "paints" },
  { name: "Plumbing", handle: "plumbing" },
  { name: "Electrical", handle: "electrical" },
  { name: "Doors", handle: "doors" },
  { name: "Windows", handle: "windows" },
  { name: "Hardware", handle: "hardware" },
  { name: "Construction Tools", handle: "construction-tools" },
  { name: "Safety Equipment", handle: "safety-equipment" },
  { name: "Water Tanks", handle: "water-tanks" },
  { name: "Construction Chemicals", handle: "construction-chemicals" },
]

const COLLECTIONS = [
  { handle: "best-sellers", title: "Best Sellers" },
  { handle: "new-arrivals", title: "New Arrivals" },
  { handle: "premium-collection", title: "Premium Collection" },
  { handle: "contractor-picks", title: "Contractor Picks" },
  { handle: "bulk-deals", title: "Bulk Deals" },
  { handle: "project-essentials", title: "Project Essentials" },
  { handle: "on-sale", title: "On Sale" },
  { handle: "recommended", title: "Recommended" },
  { handle: "top-brands", title: "Top Brands" },
  { handle: "featured-products", title: "Featured Products" },
]

function img(id: number) { return `https://picsum.photos/seed/bm${id}/600/600` }

interface ProductDef {
  title: string
  handle: string
  cat: number
  col?: number
  description: string
  weight: number
  material?: string
  brand?: string
  options?: { title: string; values: string[] }[]
  variants: { title: string; sku: string; price: number; options?: Record<string, string>; stock: number }[]
  images?: string[]
  thumbnail?: string
  features?: string[]
  tags?: string[]
  status?: ProductStatus
}

const PRODUCTS: ProductDef[] = [
  // ── Cement (5) ──
  ...(() => {
    const base = "High-quality Portland cement manufactured to IS 12269 standards"
    const desc = (b: string) => `${b} Portland cement offering consistent strength and durability. Suitable for all RCC and masonry works.`
    return [
      { title: "UltraTech Premium Cement", handle: "ultratech-premium-cement", cat: 0, col: 0, description: desc("UltraTech"), weight: 50000, material: "Cement Clinker", brand: "UltraTech", options: [{ title: "Pack Size", values: ["25 KG", "50 KG"] }], variants: [{ title: "25 KG", sku: "UT-PC-25", price: 175, options: { "Pack Size": "25 KG" }, stock: 500 }, { title: "50 KG", sku: "UT-PC-50", price: 350, options: { "Pack Size": "50 KG" }, stock: 1500 }], tags: ["cement", "opc", "ultratech"] },
      { title: "ACC Gold Cement", handle: "acc-gold-cement", cat: 0, description: desc("ACC"), weight: 50000, material: "Cement Clinker", brand: "ACC", options: [{ title: "Pack Size", values: ["25 KG", "50 KG"] }], variants: [{ title: "25 KG", sku: "ACC-G-25", price: 170, options: { "Pack Size": "25 KG" }, stock: 400 }, { title: "50 KG", sku: "ACC-G-50", price: 340, options: { "Pack Size": "50 KG" }, stock: 1200 }], tags: ["cement", "acc"] },
      { title: "Ramco SuperGrade Cement", handle: "ramco-supergrade-cement", cat: 0, description: desc("Ramco"), weight: 50000, material: "Cement Clinker", brand: "Ramco", options: [{ title: "Pack Size", values: ["25 KG", "50 KG"] }], variants: [{ title: "25 KG", sku: "RAM-SG-25", price: 165, options: { "Pack Size": "25 KG" }, stock: 350 }, { title: "50 KG", sku: "RAM-SG-50", price: 330, options: { "Pack Size": "50 KG" }, stock: 1000 }], tags: ["cement", "ramco"] },
      { title: "Dalmia DSP Cement", handle: "dalmia-dsp-cement", cat: 0, description: desc("Dalmia"), weight: 50000, material: "Cement Clinker", brand: "Dalmia", options: [{ title: "Pack Size", values: ["25 KG", "50 KG"] }], variants: [{ title: "25 KG", sku: "DAL-DSP-25", price: 160, options: { "Pack Size": "25 KG" }, stock: 300 }, { title: "50 KG", sku: "DAL-DSP-50", price: 320, options: { "Pack Size": "50 KG" }, stock: 800 }], tags: ["cement", "dalmia"] },
      { title: "JK Super Cement", handle: "jk-super-cement", cat: 0, description: desc("JK"), weight: 50000, material: "Cement Clinker", brand: "JK Cement", options: [{ title: "Pack Size", values: ["25 KG", "50 KG"] }], variants: [{ title: "25 KG", sku: "JK-SC-25", price: 168, options: { "Pack Size": "25 KG" }, stock: 200 }, { title: "50 KG", sku: "JK-SC-50", price: 335, options: { "Pack Size": "50 KG" }, stock: 600 }], tags: ["cement", "jk"] },
    ]
  })(),

  // ── Steel & TMT (8) ──
  { title: "Tata Tiscon TMT 500D 8mm", handle: "tata-tiscon-tmt-8mm", cat: 1, col: 4, description: "High-strength TMT bars from Tata Steel with superior ductility and earthquake resistance.", weight: 10000, material: "Steel", brand: "Tata Steel", options: [{ title: "Diameter", values: ["8 mm", "10 mm", "12 mm", "16 mm", "20 mm"] }], variants: [
    { title: "8 mm", sku: "TATA-TMT-8", price: 680, options: { Diameter: "8 mm" }, stock: 500 }, { title: "10 mm", sku: "TATA-TMT-10", price: 675, options: { Diameter: "10 mm" }, stock: 500 }, { title: "12 mm", sku: "TATA-TMT-12", price: 670, options: { Diameter: "12 mm" }, stock: 500 }, { title: "16 mm", sku: "TATA-TMT-16", price: 665, options: { Diameter: "16 mm" }, stock: 400 }, { title: "20 mm", sku: "TATA-TMT-20", price: 660, options: { Diameter: "20 mm" }, stock: 300 },
  ], tags: ["steel", "tmt", "tata"] },
  { title: "SAIL TMT 550D 10mm", handle: "sail-tmt-10mm", cat: 1, description: "IS 1786 certified TMT bars from SAIL with excellent bendability and weldability.", weight: 10000, material: "Steel", brand: "SAIL", options: [{ title: "Diameter", values: ["10 mm", "12 mm", "16 mm", "20 mm", "25 mm"] }], variants: [
    { title: "10 mm", sku: "SAIL-TMT-10", price: 655, options: { Diameter: "10 mm" }, stock: 400 }, { title: "12 mm", sku: "SAIL-TMT-12", price: 650, options: { Diameter: "12 mm" }, stock: 400 }, { title: "16 mm", sku: "SAIL-TMT-16", price: 645, options: { Diameter: "16 mm" }, stock: 300 }, { title: "20 mm", sku: "SAIL-TMT-20", price: 640, options: { Diameter: "20 mm" }, stock: 200 }, { title: "25 mm", sku: "SAIL-TMT-25", price: 635, options: { Diameter: "25 mm" }, stock: 100 },
  ], tags: ["steel", "tmt", "sail"] },
  { title: "JSW Steel TMT 500D", handle: "jsw-steel-tmt-500d", cat: 1, description: "Premium TMT bars from JSW with advanced thermo-mechanical treatment for superior strength.", weight: 10000, material: "Steel", brand: "JSW", options: [{ title: "Diameter", values: ["8 mm", "10 mm", "12 mm", "16 mm", "20 mm"] }], variants: [
    { title: "8 mm", sku: "JSW-TMT-8", price: 670, options: { Diameter: "8 mm" }, stock: 300 }, { title: "10 mm", sku: "JSW-TMT-10", price: 665, options: { Diameter: "10 mm" }, stock: 300 }, { title: "12 mm", sku: "JSW-TMT-12", price: 660, options: { Diameter: "12 mm" }, stock: 300 }, { title: "16 mm", sku: "JSW-TMT-16", price: 655, options: { Diameter: "16 mm" }, stock: 200 }, { title: "20 mm", sku: "JSW-TMT-20", price: 650, options: { Diameter: "20 mm" }, stock: 200 },
  ], tags: ["steel", "tmt", "jsw"] },
  { title: "Tata Steel Angle 50x50x6mm", handle: "tata-steel-angle", cat: 1, description: "IS 808 certified mild steel angle with uniform cross-section for structural applications.", weight: 12000, material: "Steel", brand: "Tata Steel", variants: [{ title: "6m length", sku: "TATA-ANG-506", price: 2450, stock: 150 }], tags: ["steel", "angle", "tata"] },
  { title: "JSW Steel Channel 100x50mm", handle: "jsw-steel-channel", cat: 1, description: "High-strength steel channel section for structural framing and support.", weight: 15000, material: "Steel", brand: "JSW", variants: [{ title: "6m length", sku: "JSW-CH-10050", price: 3200, stock: 100 }], tags: ["steel", "channel", "jsw"] },
  { title: "SAIL Beam ISMB 150", handle: "sail-beam-ismb-150", cat: 1, description: "IS 808 standard I-beam for heavy structural applications.", weight: 25000, material: "Steel", brand: "SAIL", variants: [{ title: "12m length", sku: "SAIL-ISMB150", price: 8500, stock: 50 }], tags: ["steel", "beam", "sail"] },
  { title: "Tata Steel Sheet GI 1.6mm", handle: "tata-gi-sheet-16mm", cat: 1, description: "Galvanized iron sheet with uniform zinc coating for corrosion resistance.", weight: 20000, material: "Galvanized Steel", brand: "Tata Steel", variants: [{ title: "8x4 ft", sku: "TATA-GI-16", price: 3800, stock: 200 }], tags: ["steel", "sheet", "gi", "tata"] },
  { title: "JSW Steel Plate MS 10mm", handle: "jsw-ms-plate-10mm", cat: 1, description: "Hot-rolled mild steel plate for fabrication and general engineering.", weight: 30000, material: "Mild Steel", brand: "JSW", variants: [{ title: "8x4 ft", sku: "JSW-MS-10", price: 5200, stock: 80 }], tags: ["steel", "plate", "ms", "jsw"] },

  // ── Bricks & Blocks (5) ──
  { title: "Red Clay Bricks Class A", handle: "red-clay-bricks-class-a", cat: 2, col: 0, description: "First-class burnt clay bricks as per IS 1077 with uniform size and shape.", weight: 3000, material: "Clay", variants: [{ title: "Per 1000", sku: "BRK-RC-A-1000", price: 8500, stock: 500 }], tags: ["bricks", "clay"] },
  { title: "Fly Ash Bricks 9x4x3", handle: "fly-ash-bricks", cat: 2, description: "Eco-friendly fly ash bricks with high compressive strength and uniform finish.", weight: 2800, material: "Fly Ash", variants: [{ title: "Per 1000", sku: "BRK-FA-943", price: 7200, stock: 800 }], tags: ["bricks", "flyash"] },
  { title: "AAC Blocks 600x200x200mm", handle: "aac-blocks", cat: 2, col: 5, description: "Autoclaved aerated concrete blocks for lightweight, thermal-insulated construction.", weight: 12000, material: "AAC", variants: [{ title: "Per Cubic Meter", sku: "BLK-AAC-600", price: 3500, stock: 300 }], tags: ["blocks", "aac"] },
  { title: "Solid Concrete Blocks 400x200x200mm", handle: "solid-concrete-blocks", cat: 2, description: "IS 2185 certified solid concrete blocks for load-bearing walls.", weight: 18000, material: "Concrete", variants: [{ title: "Per 100", sku: "BLK-SCB-400", price: 6500, stock: 200 }], tags: ["blocks", "concrete"] },
  { title: "Hollow Concrete Blocks 400x200x200mm", handle: "hollow-concrete-blocks", cat: 2, description: "Lightweight hollow concrete blocks for economical wall construction.", weight: 14000, material: "Concrete", variants: [{ title: "Per 100", sku: "BLK-HCB-400", price: 5500, stock: 250 }], tags: ["blocks", "hollow"] },

  // ── Sand & Aggregates (4) ──
  { title: "River Sand Fine Grade", handle: "river-sand-fine", cat: 3, col: 5, description: "Washed river sand, IS 383 compliant, ideal for plastering and masonry.", weight: 1000000, material: "Sand", variants: [{ title: "Per Ton", sku: "SAND-RIV-FINE", price: 2200, stock: 500 }], tags: ["sand", "river"] },
  { title: "M Sand (Manufactured Sand)", handle: "m-sand", cat: 3, description: "Crushed granite sand alternative, perfectly graded for concrete works.", weight: 1000000, material: "Granite", variants: [{ title: "Per Ton", sku: "SAND-M-1", price: 1800, stock: 1000 }], tags: ["sand", "m-sand"] },
  { title: "20mm Blue Metal Aggregate", handle: "blue-metal-aggregate-20mm", cat: 3, description: "Crushed granite aggregate for concrete, IS 383 graded.", weight: 1000000, material: "Granite", variants: [{ title: "Per Ton", sku: "AGG-BM-20", price: 1600, stock: 800 }], tags: ["aggregate", "metal"] },
  { title: "40mm Hardcore Base Aggregate", handle: "hardcore-aggregate-40mm", cat: 3, description: "Coarse aggregate for road base and foundation works.", weight: 1000000, material: "Granite", variants: [{ title: "Per Ton", sku: "AGG-HC-40", price: 1400, stock: 600 }], tags: ["aggregate", "hardcore"] },

  // ── Ready Mix Concrete (3) ──
  { title: "Ready Mix Concrete M20 Grade", handle: "rmc-m20-grade", cat: 4, col: 5, description: "IS 4926 standard ready-mix concrete, M20 grade for general construction.", weight: 2000000, material: "Concrete", variants: [{ title: "Per Cubic Meter", sku: "RMC-M20", price: 5200, stock: 200 }], tags: ["rmc", "concrete"] },
  { title: "Ready Mix Concrete M25 Grade", handle: "rmc-m25-grade", cat: 4, description: "IS 4926 standard RMC, M25 grade for reinforced concrete structures.", weight: 2000000, material: "Concrete", variants: [{ title: "Per Cubic Meter", sku: "RMC-M25", price: 5600, stock: 150 }], tags: ["rmc", "concrete"] },
  { title: "Self-Compacting Concrete", handle: "self-compacting-concrete", cat: 4, description: "Flowable SCC for congested reinforcement areas without vibration.", weight: 2000000, material: "Concrete", variants: [{ title: "Per Cubic Meter", sku: "SCC-M30", price: 6500, stock: 80 }], tags: ["rmc", "scc"] },

  // ── Roofing (5) ──
  { title: "Everest Fiber Cement Roofing Sheet 6mm", handle: "everest-fiber-roofing-6mm", cat: 5, col: 0, description: "IS 14862 standard fiber cement roofing sheets, weather-resistant and durable.", weight: 15000, material: "Fiber Cement", brand: "Everest", options: [{ title: "Length", values: ["2m", "2.5m", "3m"] }], variants: [
    { title: "2m", sku: "EVR-RF-6-20", price: 850, options: { Length: "2m" }, stock: 300 }, { title: "2.5m", sku: "EVR-RF-6-25", price: 1050, options: { Length: "2.5m" }, stock: 300 }, { title: "3m", sku: "EVR-RF-6-30", price: 1250, options: { Length: "3m" }, stock: 200 },
  ], tags: ["roofing", "fiber", "everest"] },
  { title: "Manasarian Profile Sheet", handle: "manasarian-profile-sheet", cat: 5, description: "Blue ridge profile metal roofing sheet with anti-corrosion coating.", weight: 8000, material: "Galvanized Steel", variants: [{ title: "8 ft", sku: "ROF-MAN-8", price: 1800, stock: 200 }], tags: ["roofing", "metal"] },
  { title: "Polycarbonate Roofing Sheet 3mm", handle: "polycarbonate-roofing-3mm", cat: 5, description: "UV-stabilized polycarbonate sheet for natural lighting in roofs.", weight: 3000, material: "Polycarbonate", variants: [{ title: "2.5m x 1m", sku: "ROF-PC-3", price: 2200, stock: 150 }], tags: ["roofing", "polycarbonate"] },
  { title: "Bitumen Waterproofing Sheet", handle: "bitumen-waterproofing-sheet", cat: 5, description: "Self-adhesive bitumen membrane for terrace waterproofing.", weight: 4000, material: "Bitumen", variants: [{ title: "10 sqm roll", sku: "ROF-BIT-10", price: 3500, stock: 100 }], tags: ["roofing", "waterproofing"] },
  { title: "Galvalume Roofing Sheet 0.5mm", handle: "galvalume-roofing-0-5mm", cat: 5, description: "Aluminum-zinc alloy coated steel sheet with superior corrosion resistance.", weight: 6000, material: "Galvalume Steel", variants: [{ title: "8 ft", sku: "ROF-GLV-05", price: 2500, stock: 180 }], tags: ["roofing", "galvalume"] },

  // ── Tiles (10) ──
  ...(() => {
    const tileDesc = (b: string, t: string) => `Premium ${t} from ${b}, glazed vitrified with high abrasion resistance.`
    return [
      { title: "Kajaria Glazed Vitrified 600x600mm", handle: "kajaria-vitrified-600x600", cat: 6, col: 2, description: tileDesc("Kajaria", "vitrified tiles"), weight: 25000, material: "Vitrified", brand: "Kajaria", options: [{ title: "Size", values: ["600x600", "800x800"] }], variants: [{ title: "600x600", sku: "KAJ-VT-600", price: 55, options: { Size: "600x600" }, stock: 2000 }, { title: "800x800", sku: "KAJ-VT-800", price: 85, options: { Size: "800x800" }, stock: 1500 }], tags: ["tiles", "vitrified", "kajaria"] },
      { title: "Somany Floor Tiles 600x600mm", handle: "somany-floor-tiles-600x600", cat: 6, description: tileDesc("Somany", "floor tiles"), weight: 24000, material: "Ceramic", brand: "Somany", variants: [{ title: "600x600", sku: "SOM-FT-600", price: 48, stock: 1800 }], tags: ["tiles", "floor", "somany"] },
      { title: "Johnson Park Tile 300x300mm", handle: "johnson-park-tile", cat: 6, description: "Anti-skid ceramic tile for outdoor and parking areas.", weight: 22000, material: "Ceramic", brand: "Johnson", variants: [{ title: "300x300", sku: "JOH-PK-300", price: 38, stock: 2500 }], tags: ["tiles", "outdoor", "johnson"] },
      { title: "Kajaria Wall Tile 300x450mm", handle: "kajaria-wall-tile", cat: 6, description: "Decorative glazed wall tile with high-gloss finish for bathrooms.", weight: 20000, material: "Ceramic", brand: "Kajaria", variants: [{ title: "300x450", sku: "KAJ-WT-300450", price: 42, stock: 3000 }], tags: ["tiles", "wall", "kajaria"] },
      { title: "Johnson Wooden Plank Tile 150x800mm", handle: "johnson-wooden-plank", cat: 6, description: "Wood-look vitrified tile with natural grain texture.", weight: 26000, material: "Vitrified", brand: "Johnson", variants: [{ title: "150x800", sku: "JOH-WD-150800", price: 75, stock: 1200 }], tags: ["tiles", "wooden", "johnson"] },
      { title: "Somany Digital Tile 800x800mm", handle: "somany-digital-tile", cat: 6, description: "Digitally printed vitrified tile with HD resolution designs.", weight: 28000, material: "Vitrified", brand: "Somany", variants: [{ title: "800x800", sku: "SOM-DT-800", price: 95, stock: 800 }], tags: ["tiles", "digital", "somany"] },
      { title: "Kajaria Outdoor Tile 400x400mm", handle: "kajaria-outdoor-tile", cat: 6, description: "Rustic outdoor tile with high slip resistance for gardens and pathways.", weight: 23000, material: "Ceramic", brand: "Kajaria", variants: [{ title: "400x400", sku: "KAJ-OT-400", price: 52, stock: 1500 }], tags: ["tiles", "outdoor", "kajaria"] },
      { title: "Johnson Multigrout 600x1200mm", handle: "johnson-multigrout-600x1200", cat: 6, col: 2, description: "Large-format rectified tile with minimal grout lines.", weight: 30000, material: "Vitrified", brand: "Johnson", variants: [{ title: "600x1200", sku: "JOH-MG-6001200", price: 135, stock: 600 }], tags: ["tiles", "large-format", "johnson"] },
      { title: "Somany Glossy Kitchen Tile 300x600mm", handle: "somany-kitchen-tile", cat: 6, description: "Easy-clean glossy tile for kitchen backsplashes.", weight: 21000, material: "Ceramic", brand: "Somany", variants: [{ title: "300x600", sku: "SOM-KT-300600", price: 58, stock: 2000 }], tags: ["tiles", "kitchen", "somany"] },
      { title: "Kajaria Marble Look Tile 800x800mm", handle: "kajaria-marble-look", cat: 6, description: "Premium marble-effect vitrified tile with polished finish.", weight: 29000, material: "Vitrified", brand: "Kajaria", variants: [{ title: "800x800", sku: "KAJ-ML-800", price: 145, stock: 400 }], tags: ["tiles", "marble", "kajaria"] },
    ]
  })(),

  // ── Marble & Granite (5) ──
  { title: "Italian Marble 20mm Thick", handle: "italian-marble-20mm", cat: 7, col: 2, description: "Premium Italian marble with elegant veining for luxury interiors.", weight: 48000, material: "Marble", variants: [{ title: "Per Sq Ft", sku: "MRB-ITL-20", price: 320, stock: 500 }], tags: ["marble", "italian"] },
  { title: "Indian Marble 18mm Thick", handle: "indian-marble-18mm", cat: 7, description: "High-quality Indian marble from Rajasthan, polished on one side.", weight: 45000, material: "Marble", variants: [{ title: "Per Sq Ft", sku: "MRB-IND-18", price: 85, stock: 2000 }], tags: ["marble", "indian"] },
  { title: "Black Galaxy Granite 20mm", handle: "black-galaxy-granite", cat: 7, description: "Premium black granite with golden speckles, polished finish.", weight: 50000, material: "Granite", variants: [{ title: "Per Sq Ft", sku: "GRN-BG-20", price: 180, stock: 800 }], tags: ["granite", "black"] },
  { title: "Absolute Black Granite 20mm", handle: "absolute-black-granite", cat: 7, description: "Deep black granite with consistent color, ideal for kitchen countertops.", weight: 50000, material: "Granite", variants: [{ title: "Per Sq Ft", sku: "GRN-AB-20", price: 210, stock: 600 }], tags: ["granite", "black"] },
  { title: "Tan Brown Granite 20mm", handle: "tan-brown-granite", cat: 7, description: "Rich brown granite with subtle patterns for premium flooring.", weight: 50000, material: "Granite", variants: [{ title: "Per Sq Ft", sku: "GRN-TB-20", price: 150, stock: 700 }], tags: ["granite", "brown"] },

  // ── Paints (10) ──
  ...(() => {
    const paintDesc = (b: string, t: string) => `Premium ${t} from ${b} with rich color payoff and durable finish.`
    const paintOpts = [{ title: "Pack Size", values: ["1L", "4L", "10L"] }]
    const mkVar = (sku: string, size: string, price: number, stock: number) => ({ title: size, sku, price, options: { "Pack Size": size }, stock })
    return [
      { title: "Asian Paints Royale Luxury Emulsion", handle: "asian-paints-royale", cat: 8, col: 9, description: paintDesc("Asian Paints", "Royale luxury emulsion paint"), weight: 4000, material: "Paint", brand: "Asian Paints", options: paintOpts, variants: [mkVar("AP-ROY-1L", "1L", 450, 500), mkVar("AP-ROY-4L", "4L", 1700, 400), mkVar("AP-ROY-10L", "10L", 4000, 200)], tags: ["paint", "emulsion", "asian"] },
      { title: "Berger Luxor Velvet Emulsion", handle: "berger-luxor-velvet", cat: 8, description: paintDesc("Berger", "Luxor Velvet emulsion paint"), weight: 4000, material: "Paint", brand: "Berger", options: paintOpts, variants: [mkVar("BERG-LUX-1L", "1L", 380, 400), mkVar("BERG-LUX-4L", "4L", 1450, 350), mkVar("BERG-LUX-10L", "10L", 3500, 150)], tags: ["paint", "emulsion", "berger"] },
      { title: "Nerolac Excel Interior Emulsion", handle: "nerolac-excel-interior", cat: 8, description: paintDesc("Nerolac", "Excel interior emulsion"), weight: 4000, material: "Paint", brand: "Nerolac", options: paintOpts, variants: [mkVar("NER-EXC-1L", "1L", 350, 350), mkVar("NER-EXC-4L", "4L", 1350, 300), mkVar("NER-EXC-10L", "10L", 3200, 120)], tags: ["paint", "emulsion", "nerolac"] },
      { title: "Asian Paints Tractor Shade Exterior", handle: "asian-paints-tractor-shade", cat: 8, description: "Weather-resistant exterior emulsion from Asian Paints.", weight: 4500, material: "Paint", brand: "Asian Paints", options: paintOpts, variants: [mkVar("AP-TRS-1L", "1L", 500, 300), mkVar("AP-TRS-4L", "4L", 1900, 250), mkVar("AP-TRS-10L", "10L", 4500, 100)], tags: ["paint", "exterior", "asian"] },
      { title: "Berger Silk Glamor Interior", handle: "berger-silk-glamor", cat: 8, description: "Silky smooth interior finish from Berger with subtle sheen.", weight: 4000, material: "Paint", brand: "Berger", options: paintOpts, variants: [mkVar("BERG-SG-1L", "1L", 420, 250), mkVar("BERG-SG-4L", "4L", 1600, 200), mkVar("BERG-SG-10L", "10L", 3800, 80)], tags: ["paint", "interior", "berger"] },
      { title: "Nerolac Impressions Emulsion", handle: "nerolac-impressions", cat: 8, description: "Premium interior emulsion with rich texture and depth.", weight: 4000, material: "Paint", brand: "Nerolac", options: paintOpts, variants: [mkVar("NER-IMP-1L", "1L", 550, 200), mkVar("NER-IMP-4L", "4L", 2100, 150), mkVar("NER-IMP-10L", "10L", 5000, 60)], tags: ["paint", "premium", "nerolac"] },
      { title: "Asian Paints Enamel White Gloss", handle: "asian-paints-enamel-gloss", cat: 8, description: "High-gloss enamel paint for wood and metal surfaces.", weight: 3500, material: "Paint", brand: "Asian Paints", options: paintOpts, variants: [mkVar("AP-ENM-1L", "1L", 320, 400), mkVar("AP-ENM-4L", "4L", 1200, 300)], tags: ["paint", "enamel", "asian"] },
      { title: "Berger WeatherCoat Exterior", handle: "berger-weathercoat", cat: 8, description: "Sunlight and rain-resistant exterior coating for long-lasting protection.", weight: 4500, material: "Paint", brand: "Berger", options: paintOpts, variants: [mkVar("BERG-WC-1L", "1L", 580, 200), mkVar("BERG-WC-4L", "4L", 2200, 150)], tags: ["paint", "exterior", "berger"] },
      { title: "Nerolac Waterproofing Coating", handle: "nerolac-waterproofing", cat: 8, description: "Elastomeric waterproof coating for terraces and exposed walls.", weight: 5000, material: "Paint", brand: "Nerolac", variants: [{ title: "1L", sku: "NER-WP-1L", price: 650, stock: 100 }, { title: "4L", sku: "NER-WP-4L", price: 2500, stock: 80 }, { title: "20L", sku: "NER-WP-20L", price: 9000, stock: 30 }], tags: ["paint", "waterproofing", "nerolac"] },
      { title: "Asian Paints Weatherproof Primer", handle: "asian-paints-primer", cat: 8, description: "Exterior grade primer for better paint adhesion and durability.", weight: 3500, material: "Paint", brand: "Asian Paints", variants: [{ title: "1L", sku: "AP-PRM-1L", price: 280, stock: 400 }, { title: "4L", sku: "AP-PRM-4L", price: 1050, stock: 300 }], tags: ["paint", "primer", "asian"] },
    ]
  })(),

  // ── Plumbing (12) ──
  { title: "Astral CPVC Pipe 1/2 inch", handle: "astral-cpvc-pipe-1-2", cat: 9, col: 5, description: "IS 15778 standard CPVC pipes for hot and cold water plumbing.", weight: 2000, material: "CPVC", brand: "Astral", options: [{ title: "Length", values: ["10 ft", "20 ft"] }], variants: [{ title: "10 ft", sku: "AST-CPVC-05-10", price: 280, options: { Length: "10 ft" }, stock: 500 }, { title: "20 ft", sku: "AST-CPVC-05-20", price: 550, options: { Length: "20 ft" }, stock: 400 }], tags: ["plumbing", "cpvc", "astral"] },
  { title: "Astral CPVC Pipe 1 inch", handle: "astral-cpvc-pipe-1", cat: 9, description: "IS 15778 standard CPVC pipe for main water lines.", weight: 3000, material: "CPVC", brand: "Astral", options: [{ title: "Length", values: ["10 ft", "20 ft"] }], variants: [{ title: "10 ft", sku: "AST-CPVC-1-10", price: 450, options: { Length: "10 ft" }, stock: 400 }, { title: "20 ft", sku: "AST-CPVC-1-20", price: 880, options: { Length: "20 ft" }, stock: 300 }], tags: ["plumbing", "cpvc", "astral"] },
  { title: "Finolex PVC Pipe 1 inch", handle: "finolex-pvc-pipe-1", cat: 9, description: "IS 4985 standard PVC pipes for drainage and sewage.", weight: 2500, material: "PVC", brand: "Finolex", options: [{ title: "Size", values: ["1 inch", "2 inch", "3 inch", "4 inch"] }], variants: [
    { title: "1 inch", sku: "FIN-PVC-1", price: 180, options: { Size: "1 inch" }, stock: 800 }, { title: "2 inch", sku: "FIN-PVC-2", price: 350, options: { Size: "2 inch" }, stock: 600 }, { title: "3 inch", sku: "FIN-PVC-3", price: 550, options: { Size: "3 inch" }, stock: 400 }, { title: "4 inch", sku: "FIN-PVC-4", price: 750, options: { Size: "4 inch" }, stock: 300 },
  ], tags: ["plumbing", "pvc", "finolex"] },
  { title: "Supreme PVC Pipe 2 inch", handle: "supreme-pvc-pipe-2", cat: 9, description: "High-quality PVC pipe from Supreme for plumbing and drainage.", weight: 3000, material: "PVC", brand: "Supreme", variants: [{ title: "10 ft", sku: "SUP-PVC-2-10", price: 380, stock: 500 }], tags: ["plumbing", "pvc", "supreme"] },
  { title: "Ashirvad CPVC Pipe 3/4 inch", handle: "ashirvad-cpvc-3-4", cat: 9, description: "Premium CPVC pipe with leak-proof joints, ISI marked.", weight: 2200, material: "CPVC", brand: "Ashirvad", variants: [{ title: "10 ft", sku: "ASH-CPVC-75-10", price: 320, stock: 450 }], tags: ["plumbing", "cpvc", "ashirvad"] },
  { title: "Astral Ball Valve 1 inch", handle: "astral-ball-valve-1", cat: 9, description: "Brass ball valve with full bore for smooth water flow.", weight: 500, material: "Brass", brand: "Astral", variants: [{ title: "1 inch", sku: "AST-BV-1", price: 450, stock: 300 }], tags: ["plumbing", "valve", "astral"] },
  { title: "Finolex Cistern 10L", handle: "finolex-cistern-10l", cat: 9, description: "ISI-marked PVC cistern with dual flush mechanism.", weight: 3000, material: "PVC", brand: "Finolex", variants: [{ title: "White", sku: "FIN-CIST-10", price: 1800, stock: 150 }], tags: ["plumbing", "cistern", "finolex"] },
  { title: "Supreme Solvent Cement 100ml", handle: "supreme-solvent-cement", cat: 9, description: "Fast-acting PVC/CPVC solvent cement for joint bonding.", weight: 100, material: "Chemical", brand: "Supreme", variants: [{ title: "100ml", sku: "SUP-SLV-100", price: 85, stock: 1000 }], tags: ["plumbing", "solvent", "supreme"] },
  { title: "Astral Bib Cock 15mm", handle: "astral-bib-cock", cat: 9, description: "Chrome-plated brass bib cock with durable ceramic disc.", weight: 200, material: "Brass", brand: "Astral", variants: [{ title: "15mm", sku: "AST-BC-15", price: 280, stock: 400 }], tags: ["plumbing", "tap", "astral"] },
  { title: "Ashirvad Water Tank Connector", handle: "ashirvad-tank-connector", cat: 9, description: "Brass tank connector with rubber gasket for leak-free installation.", weight: 150, material: "Brass", brand: "Ashirvad", variants: [{ title: "1 inch", sku: "ASH-TC-1", price: 120, stock: 500 }], tags: ["plumbing", "connector", "ashirvad"] },
  { title: "Finolex Flush Tank 15L", handle: "finolex-flush-tank-15l", cat: 9, description: "ISI-marked PVC flush tank with silent filling system.", weight: 3500, material: "PVC", brand: "Finolex", variants: [{ title: "White", sku: "FIN-FT-15", price: 2200, stock: 100 }], tags: ["plumbing", "flush", "finolex"] },
  { title: "Astral Angle Valve 1/2 inch", handle: "astral-angle-valve", cat: 9, description: "Chrome-plated angle valve with quarter-turn operation.", weight: 180, material: "Brass", brand: "Astral", variants: [{ title: "1/2 inch", sku: "AST-AV-05", price: 250, stock: 350 }], tags: ["plumbing", "valve", "astral"] },

  // ── Electrical (12) ──
  { title: "Havells Modular Switch 6A", handle: "havells-modular-switch-6a", cat: 10, col: 9, description: "IS 3853 certified modular switch with safety shutters.", weight: 100, material: "Polycarbonate", brand: "Havells", variants: [{ title: "6A", sku: "HAV-SW-6", price: 45, stock: 2000 }], tags: ["electrical", "switch", "havells"] },
  { title: "Anchor Modular Switch 16A", handle: "anchor-modular-switch-16a", cat: 10, description: "16A modular switch for heavy-duty appliances.", weight: 120, material: "Polycarbonate", brand: "Anchor", variants: [{ title: "16A", sku: "ANC-SW-16", price: 55, stock: 1500 }], tags: ["electrical", "switch", "anchor"] },
  { title: "Polycab PVC Wire 1.5 sqmm", handle: "polycab-wire-1-5sqmm", cat: 10, description: "IS 694 standard PVC insulated copper wire for house wiring.", weight: 500, material: "Copper", brand: "Polycab", variants: [{ title: "90m roll", sku: "POL-W-1.5", price: 1200, stock: 500 }], tags: ["electrical", "wire", "polycab"] },
  { title: "Havells PVC Wire 2.5 sqmm", handle: "havells-wire-2-5sqmm", cat: 10, description: "IS 694 standard copper wire for power circuits and appliances.", weight: 700, material: "Copper", brand: "Havells", variants: [{ title: "90m roll", sku: "HAV-W-2.5", price: 1850, stock: 400 }], tags: ["electrical", "wire", "havells"] },
  { title: "Anchor Modular Socket 6A", handle: "anchor-modular-socket-6a", cat: 10, description: "Universal modular socket with safety shutter.", weight: 90, material: "Polycarbonate", brand: "Anchor", variants: [{ title: "6A", sku: "ANC-SK-6", price: 35, stock: 2000 }], tags: ["electrical", "socket", "anchor"] },
  { title: "Polycab Flexible Wire 1.0 sqmm", handle: "polycab-flex-wire-1-0", cat: 10, description: "Multi-strand flexible copper wire for switchboards.", weight: 400, material: "Copper", brand: "Polycab", variants: [{ title: "90m roll", sku: "POL-FW-1.0", price: 850, stock: 600 }], tags: ["electrical", "wire", "polycab"] },
  { title: "Crompton Ceiling Fan 1200mm", handle: "crompton-ceiling-fan-1200mm", cat: 10, description: "High-velocity ceiling fan with energy-efficient motor.", weight: 3500, material: "Aluminum/Steel", brand: "Crompton", variants: [{ title: "White", sku: "CRO-FAN-1200", price: 2200, stock: 200 }], tags: ["electrical", "fan", "crompton"] },
  { title: "Havells LED Batten 20W", handle: "havells-led-batten-20w", cat: 10, description: "Energy-efficient LED batten light with aluminum body.", weight: 500, material: "Aluminum/LED", brand: "Havells", variants: [{ title: "20W", sku: "HAV-LED-20", price: 450, stock: 500 }], tags: ["electrical", "lighting", "havells"] },
  { title: "Anchor MCB 20A Single Pole", handle: "anchor-mcb-20a", cat: 10, description: "IS 60898 certified miniature circuit breaker for overload protection.", weight: 150, material: "Polycarbonate", brand: "Anchor", variants: [{ title: "20A", sku: "ANC-MCB-20", price: 180, stock: 600 }], tags: ["electrical", "mcb", "anchor"] },
  { title: "Polycab Submersible Cable 2.5 sqmm", handle: "polycab-submersible-cable-2-5", cat: 10, description: "IS 694 standard flat submersible cable for borewell pumps.", weight: 800, material: "Copper", brand: "Polycab", variants: [{ title: "Per Meter", sku: "POL-SUB-2.5", price: 45, stock: 1000 }], tags: ["electrical", "cable", "polycab"] },
  { title: "Crompton Exhaust Fan 300mm", handle: "crompton-exhaust-fan-300mm", cat: 10, description: "Window-mounted exhaust fan with high air delivery.", weight: 2500, material: "Aluminum/Steel", brand: "Crompton", variants: [{ title: "300mm", sku: "CRO-EXH-300", price: 1800, stock: 150 }], tags: ["electrical", "fan", "crompton"] },
  { title: "Havells Distribution Board 8 Way", handle: "havells-db-8way", cat: 10, description: "ISI-marked distribution board for MCBs and RCCBs.", weight: 900, material: "Polycarbonate", brand: "Havells", variants: [{ title: "8 Way", sku: "HAV-DB-8", price: 550, stock: 250 }], tags: ["electrical", "db", "havells"] },

  // ── Doors (6) ──
  { title: "Flush Door Shutter 30mm", handle: "flush-door-shutter-30mm", cat: 11, col: 5, description: "IS 2202 standard flush door with particle board core and veneer finish.", weight: 25000, material: "Wood/Particle Board", variants: [{ title: "30mm x 2.1m x 0.9m", sku: "DOOR-FL-30", price: 3200, stock: 100 }], tags: ["doors", "flush"] },
  { title: "Membrane Door Shutter 35mm", handle: "membrane-door-35mm", cat: 11, description: "PVC membrane door with MDF core, prefinished and ready to install.", weight: 28000, material: "MDF/PVC", variants: [{ title: "35mm x 2.1m x 0.9m", sku: "DOOR-MEM-35", price: 4500, stock: 80 }], tags: ["doors", "membrane"] },
  { title: "Teak Wood Door Frame", handle: "teak-wood-door-frame", cat: 11, col: 2, description: "Solid teak wood door frame, IS 4021 standard, with anti-termite treatment.", weight: 35000, material: "Teak Wood", variants: [{ title: "4 inch x 5 inch", sku: "DOOR-FRM-TK", price: 8500, stock: 50 }], tags: ["doors", "teak"] },
  { title: "WPC Door Frame 4x5 inch", handle: "wpc-door-frame", cat: 11, description: "Wood Plastic Composite frame, termite-proof and waterproof.", weight: 20000, material: "WPC", variants: [{ title: "4x5 inch", sku: "DOOR-FRM-WPC", price: 3500, stock: 120 }], tags: ["doors", "wpc"] },
  { title: "PVC Bathroom Door 600mm", handle: "pvc-bathroom-door", cat: 11, description: "Waterproof PVC door with frosted glass panel for bathrooms.", weight: 15000, material: "PVC/Glass", variants: [{ title: "600mm x 2100mm", sku: "DOOR-PVC-BATH", price: 5500, stock: 60 }], tags: ["doors", "pvc"] },
  { title: "French Door Pair 1200mm", handle: "french-door-pair-1200mm", cat: 11, description: "Elegant pair of glazed French doors with timber frame.", weight: 40000, material: "Wood/Glass", variants: [{ title: "1200mm x 2100mm", sku: "DOOR-FR-1200", price: 15000, stock: 25 }], tags: ["doors", "french"] },

  // ── Windows (6) ──
  { title: "UPVC Sliding Window 1200x1200mm", handle: "upvc-sliding-window", cat: 12, col: 5, description: "IS 16621 standard UPVC window with double glazing option.", weight: 18000, material: "UPVC", variants: [{ title: "1200x1200mm", sku: "WIN-UPVC-SL-1212", price: 8500, stock: 50 }], tags: ["windows", "upvc"] },
  { title: "Aluminum Casement Window 900x1200mm", handle: "aluminum-casement-window", cat: 12, description: "Durable aluminum window with powder-coated finish and clear glass.", weight: 15000, material: "Aluminum/Glass", variants: [{ title: "900x1200mm", sku: "WIN-ALM-CS-0912", price: 6500, stock: 60 }], tags: ["windows", "aluminum"] },
  { title: "Wooden Casement Window 900x1200mm", handle: "wooden-casement-window", cat: 12, description: "Teak wood window with wire-mesh screen and brass fittings.", weight: 22000, material: "Teak Wood/Glass", variants: [{ title: "900x1200mm", sku: "WIN-WD-CS-0912", price: 9500, stock: 30 }], tags: ["windows", "wooden"] },
  { title: "UPVC Fixed Window 600x600mm", handle: "upvc-fixed-window", cat: 12, description: "Fixed UPVC window for ventilation with glass panel.", weight: 8000, material: "UPVC/Glass", variants: [{ title: "600x600mm", sku: "WIN-UPVC-FX-0606", price: 2800, stock: 80 }], tags: ["windows", "upvc"] },
  { title: "Aluminum Sliding Window 1800x1200mm", handle: "aluminum-sliding-window-1800", cat: 12, description: "Large aluminum sliding window for living rooms and balconies.", weight: 25000, material: "Aluminum/Glass", variants: [{ title: "1800x1200mm", sku: "WIN-ALM-SL-1812", price: 12000, stock: 35 }], tags: ["windows", "aluminum"] },
  { title: "WPC Window Frame 4x2.5 inch", handle: "wpc-window-frame", cat: 12, description: "Wood Plastic Composite window frame, rot-proof and low maintenance.", weight: 12000, material: "WPC", variants: [{ title: "Per Meter", sku: "WIN-FRM-WPC", price: 450, stock: 200 }], tags: ["windows", "wpc"] },

  // ── Hardware (12) ──
  { title: "Galvanized Steel Nails 50mm 1kg", handle: "gi-nails-50mm", cat: 13, col: 5, description: "IS 226 standard galvanized nails for construction and woodworking.", weight: 1000, material: "Galvanized Steel", variants: [{ title: "1kg", sku: "HWD-NAIL-50-1KG", price: 120, stock: 1000 }], tags: ["hardware", "nails"] },
  { title: "Stainless Steel Screws 40mm 100pk", handle: "ss-screws-40mm", cat: 13, description: "SS 304 grade self-tapping screws for wood and metal.", weight: 500, material: "Stainless Steel", variants: [{ title: "100 pcs", sku: "HWD-SCR-40-100", price: 250, stock: 500 }], tags: ["hardware", "screws"] },
  { title: "Brass Door Handle Pair", handle: "brass-door-handle", cat: 13, col: 2, description: "Premium brass door handle with anti-corrosion coating.", weight: 800, material: "Brass", variants: [{ title: "Pair", sku: "HWD-BDH-1", price: 850, stock: 200 }], tags: ["hardware", "handle", "brass"] },
  { title: "MS Tower Bolt 8 inch", handle: "ms-tower-bolt-8", cat: 13, description: "Mild steel tower bolt with bright zinc plating.", weight: 400, material: "Mild Steel", variants: [{ title: "8 inch", sku: "HWD-TB-8", price: 85, stock: 400 }], tags: ["hardware", "bolt"] },
  { title: "SS Door Hinge 4 inch", handle: "ss-door-hinge-4", cat: 13, description: "Stainless steel butt hinge with brass pins, 4 inch.", weight: 300, material: "Stainless Steel", variants: [{ title: "4 inch pair", sku: "HWD-HNG-4", price: 180, stock: 300 }], tags: ["hardware", "hinge"] },
  { title: "Brass Padlock 50mm", handle: "brass-padlock-50mm", cat: 13, description: "Heavy-duty brass padlock with hardened steel shackle.", weight: 400, material: "Brass/Steel", variants: [{ title: "50mm", sku: "HWD-PLK-50", price: 350, stock: 200 }], tags: ["hardware", "lock"] },
  { title: "Nylon Cable Ties 200mm 100pk", handle: "nylon-cable-ties-200mm", cat: 13, description: "UV-resistant nylon cable ties for electrical bundling.", weight: 200, material: "Nylon", variants: [{ title: "100 pcs", sku: "HWD-CTV-200", price: 65, stock: 1000 }], tags: ["hardware", "cable-ties"] },
  { title: "Steel Padlock Hasps 80mm", handle: "steel-padlock-hasp", cat: 13, description: "Galvanized steel hasp and staple lock set for gates.", weight: 500, material: "Galvanized Steel", variants: [{ title: "80mm", sku: "HWD-HSP-80", price: 150, stock: 250 }], tags: ["hardware", "lock"] },
  { title: "Brass Drawer Knob 25mm", handle: "brass-drawer-knob-25mm", cat: 13, description: "Solid brass drawer knob with antique finish.", weight: 100, material: "Brass", variants: [{ title: "Each", sku: "HWD-KNB-25", price: 45, stock: 800 }], tags: ["hardware", "knob"] },
  { title: "MS L-Hook Heavy Duty 6mm", handle: "ms-l-hook-6mm", cat: 13, description: "Mild steel L-hook with zinc coating for hanging loads.", weight: 200, material: "Mild Steel", variants: [{ title: "10 pcs", sku: "HWD-LHK-6", price: 80, stock: 600 }], tags: ["hardware", "hooks"] },
  { title: "SS Gate Hook and Eye 150mm", handle: "ss-gate-hook-eye", cat: 13, description: "Stainless steel gate hook and eye latch, 150mm.", weight: 300, material: "Stainless Steel", variants: [{ title: "150mm", sku: "HWD-GHE-150", price: 120, stock: 350 }], tags: ["hardware", "gate"] },
  { title: "Rubber Door Stopper 75mm", handle: "rubber-door-stopper-75mm", cat: 13, description: "Durable rubber door stopper with brass holder.", weight: 150, material: "Rubber/Brass", variants: [{ title: "Pair", sku: "HWD-DSP-75", price: 60, stock: 500 }], tags: ["hardware", "stopper"] },

  // ── Construction Tools (10) ──
  { title: "Bosch GBH 2-28 Rotary Hammer", handle: "bosch-gbh-2-28", cat: 14, col: 3, description: "850W professional rotary hammer drill with SDS-plus chuck.", weight: 4800, material: "Metal/Plastic", brand: "Bosch", variants: [{ title: "GBH 2-28", sku: "BOS-GBH228", price: 8500, stock: 40 }], tags: ["tools", "drill", "bosch"] },
  { title: "Bosch GSB 550 Professional Drill", handle: "bosch-gsb-550", cat: 14, description: "550W impact drill with 13mm keyless chuck.", weight: 2000, material: "Metal/Plastic", brand: "Bosch", variants: [{ title: "GSB 550", sku: "BOS-GSB550", price: 4200, stock: 60 }], tags: ["tools", "drill", "bosch"] },
  { title: "Bosch GWS 600 Angle Grinder", handle: "bosch-gws-600", cat: 14, description: "600W angle grinder with 100mm wheel for cutting and grinding.", weight: 1900, material: "Metal/Plastic", brand: "Bosch", variants: [{ title: "GWS 600", sku: "BOS-GWS600", price: 3500, stock: 60 }], tags: ["tools", "grinder", "bosch"] },
  { title: "Heavy Duty Concrete Mixer 200L", handle: "concrete-mixer-200l", cat: 14, description: "200L drum capacity concrete mixer with 1HP motor.", weight: 150000, material: "Steel", variants: [{ title: "200L", sku: "TL-MXR-200", price: 28000, stock: 15 }], tags: ["tools", "concrete", "mixer"] },
  { title: "Masonry Trowel Set 4pcs", handle: "masonry-trowel-set", cat: 14, description: "Forged carbon steel trowels with hardwood handles, set of 4.", weight: 800, material: "Carbon Steel/Wood", variants: [{ title: "4 pcs set", sku: "TL-TRW-4", price: 450, stock: 200 }], tags: ["tools", "trowel"] },
  { title: "Measuring Tape 5m", handle: "measuring-tape-5m", cat: 14, description: "Fiberglass measuring tape with auto lock mechanism.", weight: 200, material: "Plastic/Fiberglass", variants: [{ title: "5m", sku: "TL-TAP-5", price: 150, stock: 500 }], tags: ["tools", "tape"] },
  { title: "Spirit Level 24 inch", handle: "spirit-level-24", cat: 14, description: "Aluminum spirit level with shock-absorbent end caps.", weight: 600, material: "Aluminum", variants: [{ title: "24 inch", sku: "TL-LVL-24", price: 380, stock: 150 }], tags: ["tools", "level"] },
  { title: "Mason Chisel Set 5pcs", handle: "mason-chisel-set", cat: 14, description: "Heat-treated steel chisels with anti-slip grips.", weight: 1200, material: "Carbon Steel", variants: [{ title: "5 pcs set", sku: "TL-CHS-5", price: 350, stock: 180 }], tags: ["tools", "chisel"] },
  { title: "Heavy Duty Wheelbarrow 100L", handle: "heavy-duty-wheelbarrow", cat: 14, description: "100L steel tray wheelbarrow with pneumatic tire.", weight: 18000, material: "Mild Steel", variants: [{ title: "100L", sku: "TL-WBR-100", price: 4500, stock: 40 }], tags: ["tools", "wheelbarrow"] },
  { title: "Vibrator Needle 40mm", handle: "vibrator-needle-40mm", cat: 14, description: "Concrete vibrator needle for proper compaction of concrete.", weight: 5000, material: "Steel", variants: [{ title: "40mm x 4m", sku: "TL-VBN-40", price: 3800, stock: 20 }], tags: ["tools", "vibrator"] },

  // ── Safety Equipment (8) ──
  { title: "Industrial Safety Helmet ISI", handle: "industrial-safety-helmet", cat: 15, col: 3, description: "IS 2923 certified ABS safety helmet with 6-point suspension.", weight: 400, material: "ABS Plastic", options: [{ title: "Color", values: ["White", "Yellow", "Orange", "Blue"] }], variants: [
    { title: "White", sku: "SAF-HLM-WH", price: 180, options: { Color: "White" }, stock: 500 }, { title: "Yellow", sku: "SAF-HLM-YL", price: 180, options: { Color: "Yellow" }, stock: 500 }, { title: "Orange", sku: "SAF-HLM-OR", price: 180, options: { Color: "Orange" }, stock: 400 }, { title: "Blue", sku: "SAF-HLM-BL", price: 180, options: { Color: "Blue" }, stock: 400 },
  ], tags: ["safety", "helmet"] },
  { title: "Safety Goggles Anti-Fog", handle: "safety-goggles-anti-fog", cat: 15, description: "Polycarbonate safety goggles with anti-fog and anti-scratch coating.", weight: 100, material: "Polycarbonate", variants: [{ title: "Clear", sku: "SAF-GGL-CL", price: 120, stock: 600 }], tags: ["safety", "goggles"] },
  { title: "N95 Dust Mask 50pk", handle: "n95-dust-mask-50pk", cat: 15, description: "IS 9473 certified N95 respirator with exhalation valve.", weight: 300, material: "Non-woven Fabric", variants: [{ title: "50 pcs box", sku: "SAF-N95-50", price: 850, stock: 300 }], tags: ["safety", "mask"] },
  { title: "PVC Safety Gloves Heavy Duty", handle: "pvc-safety-gloves", cat: 15, description: "IS 4775 standard PVC-coated safety gloves for construction.", weight: 200, material: "PVC/Cotton", variants: [{ title: "Pair", sku: "SAF-GLV-PVC", price: 95, stock: 800 }], tags: ["safety", "gloves"] },
  { title: "Safety Vest Reflective XS-XXL", handle: "safety-vest-reflective", cat: 15, description: "IS 15809 standard high-visibility safety vest with reflective strips.", weight: 200, material: "Polyester", variants: [{ title: "Standard", sku: "SAF-VST-RFL", price: 250, stock: 300 }], tags: ["safety", "vest"] },
  { title: "Steel Toe Safety Boot Size 7-12", handle: "steel-toe-safety-boot", cat: 15, description: "IS 15298 standard leather safety boot with steel toe cap.", weight: 1500, material: "Leather/Steel", variants: [{ title: "Size 8", sku: "SAF-BT-8", price: 1800, stock: 100 }], tags: ["safety", "boots"] },
  { title: "Ear Plug Dispenser Box 200pk", handle: "ear-plug-dispenser-200", cat: 15, description: "Foam ear plugs with NRR 33dB noise protection.", weight: 500, material: "Foam", variants: [{ title: "200 pair box", sku: "SAF-EP-200", price: 450, stock: 150 }], tags: ["safety", "ear-plug"] },
  { title: "Full Body Safety Harness", handle: "full-body-safety-harness", cat: 15, description: "IS 3521 standard full body harness with D-ring for fall protection.", weight: 2000, material: "Polyester Webbing/Steel", variants: [{ title: "Standard", sku: "SAF-HRN-FB", price: 3500, stock: 40 }], tags: ["safety", "harness"] },

  // ── Water Tanks (5) ──
  { title: "Sintex Water Tank 500L", handle: "sintex-water-tank-500l", cat: 16, col: 5, description: "IS 12701 standard three-layer water tank with anti-bacterial protection.", weight: 15000, material: "Polyethylene", brand: "Sintex", variants: [{ title: "500L", sku: "SIN-WT-500", price: 4500, stock: 80 }], tags: ["water-tank", "sintex"] },
  { title: "Sintex Water Tank 1000L", handle: "sintex-water-tank-1000l", cat: 16, description: "1000L three-layer water tank with UV stabilization.", weight: 25000, material: "Polyethylene", brand: "Sintex", variants: [{ title: "1000L", sku: "SIN-WT-1000", price: 7500, stock: 50 }], tags: ["water-tank", "sintex"] },
  { title: "Sintex Water Tank 2000L", handle: "sintex-water-tank-2000l", cat: 16, description: "Large capacity water tank for residential water storage.", weight: 40000, material: "Polyethylene", brand: "Sintex", variants: [{ title: "2000L", sku: "SIN-WT-2000", price: 12000, stock: 30 }], tags: ["water-tank", "sintex"] },
  { title: "Loft Water Tank 200L", handle: "loft-water-tank-200l", cat: 16, description: "Compact water tank for loft/terrace installation, ISI marked.", weight: 6000, material: "Polyethylene", variants: [{ title: "200L", sku: "TNK-LFT-200", price: 1800, stock: 150 }], tags: ["water-tank", "loft"] },
  { title: "Squat Water Tank 300L", handle: "squat-water-tank-300l", cat: 16, description: "Space-saving squat design water tank for limited spaces.", weight: 8000, material: "Polyethylene", variants: [{ title: "300L", sku: "TNK-SQT-300", price: 2800, stock: 100 }], tags: ["water-tank", "squat"] },

  // ── Construction Chemicals (8) ──
  { title: "Fosroc Waterstop PVC 20m Roll", handle: "fosroc-waterstop-pvc", cat: 17, description: "PVC waterstop for expansion and construction joints in concrete.", weight: 5000, material: "PVC", variants: [{ title: "20m roll", sku: "CHM-FWS-20", price: 3200, stock: 50 }], tags: ["chemicals", "waterstop"] },
  { title: "Sika Epoxy Adhesive 1kg", handle: "sika-epoxy-adhesive-1kg", cat: 17, description: "Two-part epoxy adhesive for concrete crack repair and bonding.", weight: 1000, material: "Epoxy", variants: [{ title: "1kg", sku: "CHM-SIK-EP-1", price: 850, stock: 150 }], tags: ["chemicals", "epoxy", "sika"] },
  { title: "Fosroc Chemical Anchor 300ml", handle: "fosroc-chemical-anchor", cat: 17, description: "Polyester resin chemical anchor for heavy-duty fixings.", weight: 400, material: "Polyester Resin", variants: [{ title: "300ml", sku: "CHM-FCA-300", price: 450, stock: 200 }], tags: ["chemicals", "anchor"] },
  { title: "Waterproofing Coating Liquid 5L", handle: "waterproofing-coating-5l", cat: 17, description: "Acrylic-based waterproofing coating for terraces and roofs.", weight: 5000, material: "Acrylic", variants: [{ title: "5L", sku: "CHM-WPC-5", price: 1200, stock: 100 }], tags: ["chemicals", "waterproofing"] },
  { title: "Concrete Hardener 5L", handle: "concrete-hardener-5l", cat: 17, description: "Liquid concrete hardener for dust-proofing and strengthening floors.", weight: 5200, material: "Chemical", variants: [{ title: "5L", sku: "CHM-CH-5", price: 650, stock: 80 }], tags: ["chemicals", "concrete"] },
  { title: "Tile Adhesive 20kg", handle: "tile-adhesive-20kg", cat: 17, description: "Cement-based tile adhesive for floor and wall tiles.", weight: 20000, material: "Cement/Polymer", variants: [{ title: "20kg", sku: "CHM-TAD-20", price: 350, stock: 300 }], tags: ["chemicals", "adhesive"] },
  { title: "Tile Grout White 1kg", handle: "tile-grout-white-1kg", cat: 17, description: "White cement-based grout for tile joints.", weight: 1000, material: "Cement/Polymer", variants: [{ title: "1kg", sku: "CHM-TGR-WT", price: 85, stock: 500 }], tags: ["chemicals", "grout"] },
  { title: "Plywood Waterproof Adhesive 500ml", handle: "plywood-adhesive-500ml", cat: 17, description: "Synthetic resin adhesive for plywood and laminate bonding.", weight: 600, material: "Synthetic Resin", variants: [{ title: "500ml", sku: "CHM-PWA-500", price: 180, stock: 200 }], tags: ["chemicals", "adhesive"] },
]

function productToInput(
  p: ProductDef,
  catMap: Map<string, string>,
  colMap: Map<string, string>,
  optMap: Map<string, string>,
  shippingProfileId: string,
  scId: string,
  brandNames: string[],
) {
  const hasCustomOptions = p.options && p.options.length > 0
  const defaultOption = { title: "Default", values: p.variants.map((v) => v.title) }

  const variants = p.variants.map((v) => {
    const base: any = {
      title: v.title,
      sku: v.sku,
      manage_inventory: true,
      prices: [{ amount: v.price * 100, currency_code: "inr" }],
    }
    if (v.options) base.options = v.options
    if (!hasCustomOptions) base.options = { Default: v.title }
    return base
  })

  const options: any = hasCustomOptions
    ? p.options!.map((o) => {
        const id = optMap.get(o.title)
        return {
          ...(id ? { id } : { title: o.title }),
          values: o.values,
        }
      })
    : [{ title: "Default", values: p.variants.map((v) => v.title) }]

  const images = (p.images || [img(Math.floor(Math.random() * 10000))]).map((url) => ({
    url,
  }))

  return {
    title: p.title,
    handle: p.handle,
    category_ids: p.cat !== undefined ? [catMap.get(CATEGORIES[p.cat].name)!] : undefined,
    collection_id: p.col !== undefined ? colMap.get(COLLECTIONS[p.col].title) : undefined,
    description: p.description,
    weight: p.weight,
    material: p.material,
    // Omit tags to avoid 'Tag with id undefined not found' V2 core-flows bug
    status: p.status || ProductStatus.PUBLISHED,
    shipping_profile_id: shippingProfileId,
    images,
    options,
    variants,
    sales_channels: [{ id: scId }],
  }
}

export default async function initial_data_seed({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(ModuleRegistrationName.FULFILLMENT)

  const countries = ["in"]
  const currencyCode = "inr"

  logger.info("Seeding store data...")

  const { result: [salesChannel] } = await createSalesChannelsWorkflow(container).run({
    input: { salesChannelsData: [{ name: "Default Sales Channel", description: "Created by BuildMart" }] },
  })

  const { result: [publishableApiKey] } = await createApiKeysWorkflow(container).run({
    input: { api_keys: [{ title: "Default Publishable API Key", type: "publishable", created_by: "" }] },
  })

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [salesChannel.id] },
  })

  const { result: [store] } = await createStoresWorkflow(container).run({
    input: {
      stores: [{
        name: "BuildMart Store",
        supported_currencies: [{ currency_code: currencyCode, is_default: true }],
        default_sales_channel_id: salesChannel.id,
      }],
    },
  })

  logger.info("Seeding region...")
  const { result: [region] } = await createRegionsWorkflow(container).run({
    input: {
      regions: [{
        name: "India",
        currency_code: currencyCode,
        countries,
        payment_providers: ["pp_system_default"],
      }],
    },
  })

  await createTaxRegionsWorkflow(container).run({
    input: countries.map((c) => ({ country_code: c, provider_id: "tp_system" })),
  })

  logger.info("Seeding stock locations...")
  const { result: [stockLocation] } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [{ name: "India Warehouse", address: { city: "Mumbai", country_code: "IN", address_1: "" } }],
    },
  })

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  })

  logger.info("Seeding fulfillment...")
  let { data: [shippingProfile] } = await query.graph({ entity: "shipping_profile", fields: ["id"] })
  if (!shippingProfile) {
    const profiles = await fulfillmentModuleService.createShippingProfiles([
      { name: "Default Shipping", type: "default" },
    ])
    shippingProfile = profiles[0] as any
    if (!shippingProfile) {
      const { data: [found] } = await query.graph({ entity: "shipping_profile", fields: ["id"] })
      shippingProfile = found
    }
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "India Warehouse delivery",
    type: "shipping",
  })

  logger.info(`Fulfillment set created: ${fulfillmentSet.id}`)

  const createdZones = await fulfillmentModuleService.createServiceZones([{
    fulfillment_set_id: fulfillmentSet.id,
    name: "India",
    geo_zones: [{ country_code: "in", type: "country" }],
  }])
  logger.info(`Service zones created: ${JSON.stringify(createdZones)}`)

  const serviceZone = Array.isArray(createdZones) ? createdZones[0] : createdZones
  if (!serviceZone) {
    throw new Error("Failed to create or retrieve service zone")
  }

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  })

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Delivery",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Standard", description: "Delivery in 3-5 business days.", code: "standard" },
        prices: [{ currency_code: currencyCode, amount: 5000, region_id: region.id }],
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
      {
        name: "Express Delivery",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Express", description: "Delivery in 1-2 business days.", code: "express" },
        prices: [{ currency_code: currencyCode, amount: 15000, region_id: region.id }],
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
      {
        name: "Bulk Freight",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Bulk Freight", description: "For bulk orders above 100kg.", code: "bulk" },
        prices: [{ currency_code: currencyCode, amount: 50000, region_id: region.id }],
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
      {
        name: "Store Pickup",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Pickup", description: "Free pickup from our store.", code: "pickup" },
        prices: [{ currency_code: currencyCode, amount: 0, region_id: region.id }],
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
    ],
  })

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [salesChannel.id] },
  })

  logger.info("Seeding categories...")
  const { result: categories } = await createProductCategoriesWorkflow(container).run({
    input: { product_categories: CATEGORIES.map((c) => ({ name: c.name, handle: c.handle, is_active: true })) },
  })
  const catMap = new Map<string, string>()
  categories.forEach((c: any) => catMap.set(c.name, c.id))

  logger.info("Seeding collections...")
  const { result: collections } = await createCollectionsWorkflow(container).run({
    input: { collections: COLLECTIONS.map((c) => ({ title: c.title, handle: c.handle })) },
  })
  const colMap = new Map<string, string>()
  collections.forEach((c: any) => colMap.set(c.title, c.id))

  logger.info("Seeding product options...")
  const optionDefs = [
    { title: "Pack Size", values: ["25 KG", "50 KG", "1L", "4L", "10L", "20L"] },
    { title: "Diameter", values: ["8 mm", "10 mm", "12 mm", "16 mm", "20 mm", "25 mm"] },
    { title: "Size", values: ["600x600", "800x800", "1200x1200", "1 inch", "2 inch", "3 inch", "4 inch", "1/2 inch", "3/4 inch"] },
    { title: "Length", values: ["10 ft", "20 ft", "2m", "2.5m", "3m"] },
    { title: "Color", values: ["White", "Yellow", "Orange", "Blue"] },
    { title: "Thickness", values: ["6mm", "8mm", "10mm", "12mm", "18mm", "20mm"] },
  ]
  const { result: productOptions } = await createProductOptionsWorkflow(container).run({
    input: { product_options: optionDefs },
  })
  const optMap = new Map<string, string>()
  productOptions.forEach((o: any) => optMap.set(o.title, o.id))

  const brandNames = ["UltraTech", "ACC", "Ramco", "Dalmia", "JK Cement", "JSW", "Tata Steel", "SAIL", "Kajaria", "Somany", "Johnson", "Asian Paints", "Berger", "Nerolac", "Astral", "Finolex", "Supreme", "Ashirvad", "Havells", "Anchor", "Polycab", "Crompton", "Sintex", "Bosch", "Everest"]

  logger.info(`Seeding ${PRODUCTS.length} products...`)

  const batchSize = 25
  for (let i = 0; i < PRODUCTS.length; i += batchSize) {
    const batch = PRODUCTS.slice(i, i + batchSize)
    await createProductsWorkflow(container).run({
      input: {
        products: batch.map((p) => productToInput(p, catMap, colMap, optMap, shippingProfile.id, salesChannel.id, brandNames)),
      },
    })
    logger.info(`  Seeded products ${i + 1}-${Math.min(i + batchSize, PRODUCTS.length)}...`)
  }

  logger.info("Seeding inventory levels...")
  const { data: inventoryItems } = await query.graph({ entity: "inventory_item", fields: ["id"] })
  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item: any) => ({
        location_id: stockLocation.id,
        stocked_quantity: 10000,
        inventory_item_id: item.id,
      })),
    },
  })

  logger.info("Seeding complete! BuildMart store is ready.")
}
