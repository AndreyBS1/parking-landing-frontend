import GeoPosition from '../components/geo-position.component'
import Header from '../components/header.component'
import Hero from '../components/hero.component'
import ParkingPlan from '../components/parking-plan.component'

export default function MainPage() {
  return (
    <>
      <Header />
      <Hero />
      <ParkingPlan />
      <GeoPosition />
    </>
  )
}
