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
        <h2 className="mb-16 lg:mb-12 text-5xl lg:text-4xl font-bold">
          ЖК “Чистое Небо”
        </h2>
        <p className="mb-6 lg:mb-4">
          Проект в ЖК “Чистое Небо” будет реализован следующим образом:
        </p>
        <p className="mb-6 lg:mb-4">
          ⁃ На цокольном и первом этажах здания располагаются нежилые помещения, которые
          будут функционировать в формате торгового центра. Супермаркет “Перекресток”
          занимает помещение на цокольном этаже.
        </p>
        <p className="mb-6 lg:mb-4">
          ⁃ На этажах со второго по шестой располагаются паркинг и кладовые. Уже сейчас Вы
          можете забронировать и приобрести в собственность машино-место или кладовую по
          сниженной цене, передача ключей - до 8 апреля 2024 года.
        </p>
        <p className="mb-16 lg:mb-12">
          В данный момент на объекте ведутся строительно-монтажные работы по
          переустройству цокольного и первого этажей.
          <br />
          Срок выполнения работ - до 15 мая 2024 года.
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
