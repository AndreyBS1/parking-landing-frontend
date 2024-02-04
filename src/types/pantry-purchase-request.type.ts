import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'
import { IPantryPlace } from './pantry-place.type'

export interface IPantryPurchaseRequest {
  id: number
  customerName: string
  customerEmail: string
  customerPhoneNumber: string
  status: PurchaseRequestStatusesEnum
  pantryPlace: IPantryPlace
  createdAt: Date
  updatedAt: Date
}
