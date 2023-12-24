import { AxiosResponse } from 'axios'
import { baseClient } from './base-client'

interface ICreateCallRequestDto {
  customerName: string
  customerPhoneNumber: string
}

export function createCallRequest(payload: ICreateCallRequestDto) {
  return baseClient.post<
    void,
    AxiosResponse<void, ICreateCallRequestDto>,
    ICreateCallRequestDto
  >('/call-requests', payload)
}
