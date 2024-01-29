import { useLayoutEffect, useState } from 'react'
import Section from './section.component'

export default function GeoPosition() {
  const [mapSizes, setMapSizes] = useState({ width: 50, height: 50 })

  useLayoutEffect(() => {
    const element = document.querySelector('#geo-position')
    if (element) {
      setMapSizes({ width: element.clientWidth, height: element.clientHeight })
    }
  }, [])

  return (
    <Section id="geo-position">
      {/* <img
        src="/images/geo-position.jpeg"
        alt="Местоположение"
        className="h-[40rem] lg:h-screen w-full object-cover object-center"
      /> */}
      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=30.313528%2C59.939053&mode=poi&poi%5Bpoint%5D=30.314566%2C59.939864&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1057721048&z=15.64"
        width={mapSizes.width}
        height={mapSizes.height}
        allowFullScreen
      ></iframe>
    </Section>
  )
}
