import Button from '../shared-ui/button.component'

export default function Hero() {
  const handleButtonClick = () => {
    const parkingPlanElement = document.querySelector('#parking-plan')
    if (parkingPlanElement) {
      parkingPlanElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="h-[48.5rem] bg-hero bg-cover bg-center pt-[16.95rem] px-[8.1rem]">
      <img src="/images/hero-logo.png" alt="" className="w-[53.95rem] mb-44" />
      <div className="flex justify-center">
        <Button className="py-4 px-12 text-xl uppercase" onClick={handleButtonClick}>
          купить машино-место
        </Button>
      </div>
    </div>
  )
}
