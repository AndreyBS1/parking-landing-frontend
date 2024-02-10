import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'

interface IPurchaseRequestStatus {
  color: string
  title: string
}

export const PurchaseRequestStatusRecord: Record<
  PurchaseRequestStatusesEnum,
  IPurchaseRequestStatus
> = {
  [PurchaseRequestStatusesEnum.Idle]: { color: 'gray', title: 'В ожидании' },
  [PurchaseRequestStatusesEnum.InProcess]: { color: 'black', title: 'В обработке' },
  [PurchaseRequestStatusesEnum.Approved]: { color: 'green', title: 'Одобрена' },
  [PurchaseRequestStatusesEnum.Rejected]: { color: 'red', title: 'Отклонена' },
}
