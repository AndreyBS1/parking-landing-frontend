import { AxiosResponse } from 'axios'
import { INewsPost } from '../types/news-post.type'
import { adminClient } from './admin-client'

interface ICreateNewsPostDto {
  title: string
  description: string
  createdAt: string
  imagePath: string | null
}

export async function createNewsPost(payload: ICreateNewsPostDto) {
  const { data } = await adminClient.post<
    void,
    AxiosResponse<INewsPost, ICreateNewsPostDto>,
    ICreateNewsPostDto
  >('/blogs', payload)
  return data
}
