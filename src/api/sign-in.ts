import { AxiosResponse } from 'axios'
import { baseClient } from './base-client'

interface ISignInDto {
  username: string
  password: string
}

interface ISignInResponse {
  accessToken: string
}

export async function signIn(payload: ISignInDto) {
  const { data } = await baseClient.post<
    ISignInResponse,
    AxiosResponse<ISignInResponse, ISignInDto>,
    ISignInDto
  >('/auth/sign-in', payload)
  return data
}
