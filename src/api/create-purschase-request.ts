import { AxiosResponse } from 'axios'
import { baseClient } from './base-client'

interface ICreatePurchaseRequestDto {
  parkingPlaceId: number
  customerName: string
  customerEmail: string
  customerPhoneNumber: string
}

export function createPurchaseRequest(payload: ICreatePurchaseRequestDto) {
  return baseClient.post<
    void,
    AxiosResponse<void, ICreatePurchaseRequestDto>,
    ICreatePurchaseRequestDto
  >('/purchase-requests', payload)
}
