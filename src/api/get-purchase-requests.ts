import { AxiosResponse } from 'axios'
import { IPurchaseRequest } from '../types/purchase-request.type'
import { adminClient } from './admin-client'

export async function getPurchaseRequests() {
  const { data } = await adminClient.get<
    IPurchaseRequest[],
    AxiosResponse<IPurchaseRequest[], void>,
    void
  >('/purchase-requests')
  return data
}
