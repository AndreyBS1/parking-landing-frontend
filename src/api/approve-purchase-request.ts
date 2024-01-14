import { adminClient } from './admin-client'

export function approvePurchaseRequest(id: number) {
  return adminClient.patch(`/purchase-requests/${id}/approve`)
}
