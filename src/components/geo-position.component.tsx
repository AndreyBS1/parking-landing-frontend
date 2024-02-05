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
      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=30.218990%2C60.039691&mode=whatshere&utm_source=share&whatshere%5Bpoint%5D=30.218715%2C60.039715&whatshere%5Bzoom%5D=17&z=17"
        width={mapSizes.width}
        height={mapSizes.height}
        allowFullScreen
      ></iframe>
    </Section>
  )
}
