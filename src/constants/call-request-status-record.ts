import { CallRequestStatusesEnum } from '../enums/call-request-statuses.enum'

interface ICallRequestStatus {
  color: string
  title: string
}

export const CallRequestStatusRecord: Record<
  CallRequestStatusesEnum,
  ICallRequestStatus
> = {
  [CallRequestStatusesEnum.Idle]: { color: 'black', title: 'В ожидании' },
  [CallRequestStatusesEnum.Closed]: { color: 'green', title: 'Обработана' },
}
