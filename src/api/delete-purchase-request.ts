import { adminClient } from './admin-client'

export function deletePurchaseRequest(id: number) {
  return adminClient.delete(`/purchase-requests/${id}`)
}
