import { adminClient } from './admin-client'

export function rejectPurchaseRequest(id: number) {
  return adminClient.patch(`/purchase-requests/${id}/reject`)
}
