import { useSwiper } from 'swiper/react'

import Button from '../shared-ui/button.component'
import Section from './section.component'

export default function AboutPlace() {
  const swiper = useSwiper()

  const handleButtonClick = () => {
    if (window.innerWidth >= 1024) {
      swiper.slideTo(1)
      return
    }
    const parkingPlanElement = document.querySelector('#parking-plan')
    if (parkingPlanElement) {
      parkingPlanElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section className="bg-about-place text-white bg-cover bg-center py-32 lg:py-0 px-5 lg:px-[8.1rem] flex flex-col sm:flex-col md:flex-row md:justify-between items-center">
      <div className="mb-12 lg:mb-0 lg:text-xl md:w-5/12 sm:w-full">
        <h2 className="mb-16 lg:mb-20 text-5xl lg:text-4xl font-bold">
          ЖК “Чистое Небо”
        </h2>
        <p className="mb-6 lg:mb-10">
          Проект в ЖК “Чистое Небо” мы планируем реализовать следующим образом:
        </p>
        <p className="mb-6 lg:mb-10">
          ⁃ Цокольный и первый этаж здания будет использоваться под коммерческие цели
          (цокольный этаж - супермаркет “Перекресток” с другими арендаторами прикассовой
          зоны, концепция на первом этаже пока не утверждена)
        </p>
        <p className="mb-16 lg:mb-20">
          ⁃ Все остальные этажи здания будут использоваться как паркинг и кладовые (уже
          сейчас Вы можете забронировать и приобрести в собственность машино-место или
          кладовую по сниженной цене, передача ключей - 3 апреля 2024 года
        </p>
        <Button
          className="mb-16 lg:mb-0 py-4 px-12 lg:text-xl uppercase shadow-md"
          onClick={handleButtonClick}
        >
          Купить машино-место
        </Button>
      </div>

      <div className="md:w-6/12 sm:w-full flex flex-col justify-start">
        <div className="lg:-mb-10 relative">
          <div className="absolute right-6 lg:right-20 lg:top-4 flex flex-col items-center gap-y-2">
            <p className="h-12 lg:h-[3.55rem] w-12 lg:w-[3.55rem] rounded-full flex justify-center items-center text-2xl lg:text-[2rem] bg-primary font-bold">
              1
            </p>
            <p className="uppercase">ЭТАЖ</p>
          </div>
          <img
            src="/images/first-floor.png"
            alt=""
            className="w-8/12 sm:w-3/4 md:w-10/12 lg:w-11/12"
          />
        </div>

        <div className="relative">
          <div className="absolute right-6 lg:right-20 lg:top-4 flex flex-col items-center gap-y-2">
            <p className="h-12 lg:h-[3.55rem] w-12 lg:w-[3.55rem] rounded-full flex justify-center items-center text-2xl lg:text-[2rem] bg-primary font-bold">
              -1
            </p>
            <p className="uppercase">ЭТАЖ</p>
          </div>
          <img
            src="/images/ground-floor.png"
            alt=""
            className="w-8/12 sm:w-3/4 md:w-10/12 lg:w-11/12"
          />
        </div>
      </div>
    </Section>
  )
}
