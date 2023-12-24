import Button from '../shared-ui/button.component'

export default function Hero() {
  const handleButtonClick = () => {
    const parkingPlanElement = document.querySelector('#parking-plan')
    if (parkingPlanElement) {
      parkingPlanElement.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-[48.5rem] bg-hero bg-cover bg-center pt-[16.95rem] px-[8.1rem]">
      <img src="/images/hero-logo.png" alt="" className="w-[36.4rem] mb-[3.25rem]" />
      <p className="w-[30.1rem] mb-[2.7rem] text-white">
        Самый топовый паркинг какого вы еще не видели по адресу улица Пушкина дом
        Колотушкина который вмещает в себя миллион машиномест
      </p>
      <div className="flex justify-center">
        <Button className="py-[1.3rem] px-[1.75rem]" onClick={handleButtonClick}>
          ЗАБРОНИРОВАТЬ МЕСТО
        </Button>
      </div>
    </div>
  )
}
