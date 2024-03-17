import { Carousel } from '@mantine/carousel'
import { Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { getNewsPosts } from '../api/get-news-posts'
import NewsPostCard from './news-post-card.component'
import Section from './section.component'

export default function NewsProject() {
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQuery({
    queryKey: ['news'],
    queryFn: getNewsPosts,
  })

  if (isPostsLoading) {
    return (
      <Section className="bg-about-place px-5 lg:px-[8.1rem] flex flex-col justify-center">
        <h2 className="text-white mb-3 lg:mb-7 text-5xl lg:text-4xl py-[1.5rem] font-bold">
          Новости проекта
        </h2>
        <div className="flex-1 flex flex-col justify-center items-center">
          <Loader color="#F9B004" />
        </div>
      </Section>
    )
  }

  if (!posts || isPostsError) {
    return (
      <Section className="bg-about-place px-5 lg:px-[8.1rem] flex flex-col justify-center">
        <h2 className="text-white mb-3 lg:mb-7 text-5xl lg:text-4xl py-[1.5rem] font-bold">
          Новости проекта
        </h2>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="px-16 py-10 rounded-3xl bg-white">
            <p className="text-2xl">Похоже, новости сейчас недоступны</p>
            <p className="text-lg">
              Пожалуйста, перезагрузите страницу или попробуйте зайти позже
            </p>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section className="relative bg-about-place md:bg-center text-white bg-cover lg:bg-center pb-32 lg:pb-0 px-5 lg:px-[8.1rem] flex flex-col justify-center">
      <h2 className="mb-3 lg:mb-7 text-5xl lg:text-4xl py-[1.5rem] font-bold">
        Новости проекта
      </h2>
      <Carousel
        slideSize={{ base: '100%', lg: '50%' }}
        slideGap={{ base: 'md', lg: 90 }}
        align="start"
        previousControlIcon={
          <img
            src="/icons/up-arrow.svg"
            alt="Previous news post"
            className="w-9 h-9 -rotate-90"
          />
        }
        nextControlIcon={
          <img
            src="/icons/up-arrow.svg"
            alt="Next news post"
            className="w-9 h-9 rotate-90"
          />
        }
        classNames={{
          controls: 'mt-[75%] lg:mt-0 lg:-mx-24',
          control:
            'w-14 h-14 bg-white data-[inactive]:opacity-0 data-[inactive]:cursor-default',
        }}
      >
        {posts.map((post) => (
          <Carousel.Slide>
            <NewsPostCard key={post.id} post={post} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <div className="absolute"></div>
    </Section>
  )
}
