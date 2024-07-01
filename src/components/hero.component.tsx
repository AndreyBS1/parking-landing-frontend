import { useSwiper } from 'swiper/react'
import Button from '../shared-ui/button.component'
import { useFloorStore } from '../stores/use-floor-store.hook'
import Section from './section.component'

export default function Hero() {
  const swiper = useSwiper()
  const setFloor = useFloorStore((store) => store.setFloor)

  const handleButtonClick = (type: 'parking' | 'pantry') => {
    if (type === 'parking') {
      setFloor(1)
    }
    if (type === 'pantry') {
      setFloor(3)
    }
    if (window.innerWidth >= 1024) {
      swiper.slideNext()
      return
    }
    const parkingPlanElement = document.querySelector('#parking-plan')
    if (parkingPlanElement) {
      parkingPlanElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section className="relative bg-hero bg-cover bg-left lg:bg-center flex items-center px-5 lg:px-[8.1rem]">
      <img src="/images/hero-logo.png" alt="" className="w-full lg:w-[53.95rem]" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-x-5">
        <Button
          className="py-4 lg:text-xl uppercase shadow-md w-[25rem]"
          onClick={() => handleButtonClick('parking')}
        >
          Купить машино-место
        </Button>
        <Button
          className="py-4 lg:text-xl uppercase shadow-md w-[25rem]"
          onClick={() => handleButtonClick('pantry')}
        >
          Купить кладовое помещение
        </Button>
      </div>
    </Section>
  )
}
