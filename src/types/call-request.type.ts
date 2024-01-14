import { CallRequestStatusesEnum } from '../enums/call-request-statuses.enum'

export interface ICallRequest {
  id: number
  customerName: string
  customerPhoneNumber: string
  status: CallRequestStatusesEnum
  createdAt: Date
  updatedAt: Date
}
