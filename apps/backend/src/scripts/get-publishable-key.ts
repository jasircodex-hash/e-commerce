import { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function getPublishableKey({ container }: { container: MedusaContainer }) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data: apiKeys } = await query.graph({
    entity: "api_key",
    fields: ["id", "token", "title"],
    filters: { type: "publishable" }
  })
  console.log("PUBLISHABLE_API_KEYS_START")
  console.log(JSON.stringify(apiKeys, null, 2))
  console.log("PUBLISHABLE_API_KEYS_END")
}
