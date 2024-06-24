import { useSwiper } from 'swiper/react'
import Button from '../shared-ui/button.component'
import Section from './section.component'

export default function Hero() {
  const swiper = useSwiper()

  const handleButtonClick = () => {
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
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <Button
          className="py-4 px-12 lg:text-xl uppercase shadow-md w-max"
          onClick={handleButtonClick}
        >
          Купить машино-место
        </Button>
      </div>
    </Section>
  )
}
