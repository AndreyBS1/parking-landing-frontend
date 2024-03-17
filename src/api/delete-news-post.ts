import { adminClient } from './admin-client'

export function deleteNewsPost(id: number) {
  return adminClient.delete(`/blogs/${id}`)
}
