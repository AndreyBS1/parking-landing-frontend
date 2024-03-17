import { AxiosResponse } from 'axios'
import { INewsPost } from '../types/news-post.type'
import { baseClient } from './base-client'

export async function getNewsPosts() {
  const { data } = await baseClient.get<
    INewsPost[],
    AxiosResponse<INewsPost[], void>,
    void
  >('/blogs')
  return data
}
