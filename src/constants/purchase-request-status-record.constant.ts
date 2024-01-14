import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'

interface IPurchaseRequestStatus {
  color: string
  title: string
}

export const PurchaseRequestStatusRecord: Record<
  PurchaseRequestStatusesEnum,
  IPurchaseRequestStatus
> = {
  [PurchaseRequestStatusesEnum.Idle]: { color: 'black', title: 'В ожидании' },
  [PurchaseRequestStatusesEnum.Approved]: { color: 'green', title: 'Одобрена' },
  [PurchaseRequestStatusesEnum.Rejected]: { color: 'red', title: 'Отклонена' },
}
