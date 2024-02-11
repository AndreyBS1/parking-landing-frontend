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
    <Section className="bg-hero bg-cover bg-center pt-[16.95rem] px-5 lg:px-[8.1rem]">
      <img src="/images/hero-logo.png" alt="" className="w-full lg:w-[53.95rem] mb-44" />
      <div className="flex justify-center">
        <Button className="py-4 px-12 lg:text-xl uppercase" onClick={handleButtonClick}>
          купить машино-место
        </Button>
      </div>
    </Section>
  )
}
