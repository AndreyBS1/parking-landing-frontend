
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
    <Section className="bg-aboutPlace text-white bg-cover bg-center px-5 lg:px-[8.1rem] flex flex-col sm:flex-col md:flex-row md:justify-between items-center">
      <div className="mb-12 lg:mb-0 lg:text-xl md:w-5/12 sm:w-full">
        <h2 className="mb-10 lg:mb-14 text-5xl lg:text-4xl font-bold">ЖК “Чистое Небо”</h2>
        <p className="mb-6 lg:mb-10">
          Проект в ЖК “Чистое Небо” мы планируем реализовать следующим образом:   
        </p>
        <p className="mb-6 lg:mb-10">
         ⁃ Цокольный и первый этаж здания будет использоваться под коммерческие цели (цокольный этаж - супермаркет “Перекресток” с другими арендаторами прикассовой зоны, концепция на первом этаже пока не утверждена)  
        </p>
        <p className="mb-6 lg:mb-10">
          ⁃ Все остальные этажи здания будут использоваться как паркинг и кладовые (уже сейчас Вы можете забронировать и приобрести в собственность машино-место или кладовую по сниженной цене, передача ключей - 3 апреля 2024 года
        </p>
        <Button
          className="mb-5 py-4 px-12 lg:text-xl uppercase shadow-md"
          onClick={handleButtonClick}
        >
          Купить машино-место
        </Button>
      </div>
      <div className="mb-12 lg:mb-0 lg:text-xl md:w-6/12 sm:w-full flex flex-col justify-start">
        <div>
          <div className="absolute right-16 lg:right-52 md:right-12 sm:right-24 flex flex-col items-end gap-y-[0.7rem]">
            <Button className='h-12 w-12 rounded-full flex justify-center items-center text-2xl'>
              1
            </Button>
            <p className="uppercase">ЭТАЖ</p>
          </div>
          <img src="/images/first-floor.png" alt="" className="w-8/12 sm:w-3/4 md:w-10/12 lg:w-11/12"/>
        </div>

        <div>
          <div className="absolute right-16 lg:right-52 md:right-12 sm:right-24 flex flex-col items-end gap-y-[0.7rem]">
            <Button className='h-12 w-12 rounded-full flex justify-center items-center text-2xl'>
              -1
            </Button>
            <p className="uppercase">ЭТАЖ</p>
          </div>
          <img src="/images/ground-floor.png" alt="" className="w-8/12 sm:w-3/4 md:w-10/12 lg:w-11/12"/>
        </div>
      </div>

      {/*<img src="/images/first-floor.png" alt="" className="w-full lg:w-[33.95rem] " />*/}
      {/*<img src="/images/ground-floor.png" alt="" className="w-full lg:w-[53.95rem] mb-28" />*/}




    </Section>


  )
}