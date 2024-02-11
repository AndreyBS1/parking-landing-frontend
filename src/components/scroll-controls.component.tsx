import { useSwiper } from 'swiper/react'

export default function ScrollControls() {
  const swiper = useSwiper()

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-y-5">
      <button
        className="w-14 h-14 flex items-center justify-center bg-white border border-gray rounded-full"
        onClick={() => swiper.slidePrev()}
      >
        <img src="/icons/up-arrow.svg" alt="Scroll up" className="w-9 h-9" />
      </button>
      <button
        className="w-14 h-14 flex items-center justify-center bg-white border border-gray rounded-full"
        onClick={() => swiper.slideNext()}
      >
        <img src="/icons/up-arrow.svg" alt="Scroll down" className="w-9 h-9 rotate-180" />
      </button>
    </div>
  )
}
