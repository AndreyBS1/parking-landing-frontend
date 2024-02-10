import Footer from '../components/footer.component'
import GeoPosition from '../components/geo-position.component'
import Header from '../components/header.component'
import Hero from '../components/hero.component'
import ParkingPlan from '../components/parking-plan.component'
import PhotoGallery from '../components/photo-gallery.component'
import ScrollControls from '../components/scroll-controls.component'

export default function MainPage() {
  return (
    <>
      <Header />
      <Hero />
      <ParkingPlan />
      <GeoPosition />
      <PhotoGallery />
      <Footer />
      <ScrollControls />
    </>
  )
}
