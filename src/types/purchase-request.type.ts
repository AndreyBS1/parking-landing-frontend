import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'
import { IParkingPlace } from './parking-place.type'

export interface IPurchaseRequest {
  id: number
  customerName: string
  customerEmail: string
  customerPhoneNumber: string
  status: PurchaseRequestStatusesEnum
  parkingPlace: IParkingPlace
  createdAt: Date
  updatedAt: Date
}
