import { BASE_API_URL } from '../constants/env-vars.constant'
import { INewsPost } from '../types/news-post.type'

interface INewsPostCardProps {
  post: INewsPost
}

export default function NewsPostCard(props: INewsPostCardProps) {
  const { post } = props
  const { title, description, createdAt, imagePath } = post

  const formattedDate = new Date(createdAt).toLocaleDateString('ru')

  const imageSrc = `${BASE_API_URL}/image/${imagePath}`

  return (
    <div className="bg-white text-black rounded-3xl pt-5 pb-9 px-5">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-4 text-gray text-sm font-bold">{formattedDate}</p>
      <img
        src={imageSrc}
        alt=""
        className="w-full aspect-video rounded-xl mb-5 object-cover object-center"
      />
      <p className="text-sm">{description}</p>
    </div>
  )
}
