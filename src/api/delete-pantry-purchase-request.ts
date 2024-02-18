import { adminClient } from './admin-client'

export function deletePantryPurchaseRequest(id: number) {
  return adminClient.delete(`/pantry-purchase-requests/${id}`)
}
