import { adminClient } from './admin-client'

export function closeCallRequest(id: number) {
  return adminClient.patch(`/call-requests/${id}/close`)
}
