import { AxiosResponse } from 'axios'
import { adminClient } from './admin-client'

interface ICreateNewsPostDto {
  blogId: number
  file: File
}

export function uploadNewsPostImage(payload: ICreateNewsPostDto) {
  const { blogId, ...body } = payload

  const formData = new FormData()

  Object.entries(body).map(([key, value]) => {
    formData.append(key, value)
  })

  return adminClient.post<void, AxiosResponse<void, FormData>, FormData>(
    '/image/upload',
    formData,
    { params: { blogId } }
  )
}
