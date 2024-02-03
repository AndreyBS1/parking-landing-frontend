import { AxiosResponse } from 'axios'
import { baseClient } from './base-client'

interface ICreatePantryPurchaseRequestDto {
  pantryPlaceId: number
  customerName: string
  customerEmail: string
  customerPhoneNumber: string
}

export function createPantryPurchaseRequest(payload: ICreatePantryPurchaseRequestDto) {
  return baseClient.post<
    void,
    AxiosResponse<void, ICreatePantryPurchaseRequestDto>,
    ICreatePantryPurchaseRequestDto
  >('/pantry-purchase-requests', payload)
}
