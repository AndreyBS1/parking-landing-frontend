import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'
import { adminClient } from './admin-client'

interface IUpdatePantryPurchaseRequestStatusDto {
  id: number
  status: PurchaseRequestStatusesEnum
}

export function updatePantryPurchaseRequestStatus(
  dto: IUpdatePantryPurchaseRequestStatusDto
) {
  return adminClient.patch(`/pantry-purchase-requests/${dto.id}/update-status`, dto)
}
