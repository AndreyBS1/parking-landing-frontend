import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'

interface IPurchaseRequestStatus {
  color: string
  title: string
}

export const PurchaseRequestStatusRecord: Record<
  PurchaseRequestStatusesEnum,
  IPurchaseRequestStatus
> = {
  // [PurchaseRequestStatusesEnum.Idle]: { color: 'gray', title: 'В ожидании' },
  // [PurchaseRequestStatusesEnum.InProcess]: { color: 'black', title: 'В обработке' },
  [PurchaseRequestStatusesEnum.Idle]: { color: 'gray', title: '' },
  [PurchaseRequestStatusesEnum.InProcess]: { color: 'black', title: 'Забронировано' },
  [PurchaseRequestStatusesEnum.Approved]: { color: 'green', title: 'Продано' },
  [PurchaseRequestStatusesEnum.Rejected]: { color: 'red', title: 'Отклонено' },
}
