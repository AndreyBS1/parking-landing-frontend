import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
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
      <Swiper
        modules={[Mousewheel]}
        direction="vertical"
        mousewheel={true}
        speed={1000}
        className="hidden lg:block"
        style={{ width: '100vw', height: '100vh' }}
      >
        <SwiperSlide style={{ width: '100vw', height: '100vh' }}>
          <Header />
          <Hero />
        </SwiperSlide>
        <SwiperSlide style={{ width: '100vw', height: '100vh' }}>
          <ParkingPlan />
        </SwiperSlide>
        <SwiperSlide style={{ width: '100vw', height: '100vh' }}>
          <GeoPosition />
        </SwiperSlide>
        <SwiperSlide style={{ width: '100vw', height: '100vh' }}>
          <PhotoGallery />
          <Footer />
        </SwiperSlide>
        <ScrollControls />
      </Swiper>

      <div className="lg:hidden">
        <Header />
        <Hero />
        <ParkingPlan />
        <GeoPosition />
        <PhotoGallery />
        <Footer />
      </div>
    </>
  )
}
