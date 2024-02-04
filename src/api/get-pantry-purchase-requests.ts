import { AxiosResponse } from 'axios'
import { IPantryPurchaseRequest } from '../types/pantry-purchase-request.type'
import { adminClient } from './admin-client'

export async function getPantryPurchaseRequests() {
  const { data } = await adminClient.get<
    IPantryPurchaseRequest[],
    AxiosResponse<IPantryPurchaseRequest[], void>,
    void
  >('/pantry-purchase-requests')
  return data
}
