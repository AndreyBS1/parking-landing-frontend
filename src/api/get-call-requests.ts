import { AxiosResponse } from 'axios'
import { ICallRequest } from '../types/call-request.type'
import { adminClient } from './admin-client'

export async function getCallRequests() {
  const { data } = await adminClient.get<
    ICallRequest[],
    AxiosResponse<ICallRequest[], void>,
    void
  >('/call-requests')
  return data
}
