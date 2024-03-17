import { AxiosResponse } from 'axios'
import { adminClient } from './admin-client'

interface IUpdateNewsPostDto {
  id: number
  title: string
  description: string
  createdAt: string
  imagePath: string | null
}

export function updateNewsPost(payload: IUpdateNewsPostDto) {
  const { id, ...body } = payload
  return adminClient.patch<void, AxiosResponse<void, typeof body>, typeof body>(
    `/blogs/${id}`,
    body
  )
}
