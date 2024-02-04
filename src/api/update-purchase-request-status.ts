import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'
import { adminClient } from './admin-client'

interface IUpdatePurchaseRequestStatusDto {
  id: number
  status: PurchaseRequestStatusesEnum
}

export function updatePurchaseRequestStatus(dto: IUpdatePurchaseRequestStatusDto) {
  return adminClient.patch(`/purchase-requests/${dto.id}/update-status`, dto)
}
