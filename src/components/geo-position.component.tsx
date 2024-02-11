import Button from '../shared-ui/button.component'
import Section from './section.component'

export default function GeoPosition() {
  return (
    <Section id="geo-position" className="relative">
      <img
        src="/images/geo-position.jpg"
        alt="Местоположение паркинга"
        className="w-screen h-screen object-cover object-center"
      />
      <div className="absolute bottom-24 inset-x-0 flex justify-center">
        <a href="https://yandex.ru/maps/-/CDBMZBmZ" target="_blank" rel="noreferrer">
          <Button className="py-4 px-12 lg:text-xl uppercase">Открыть карту</Button>
        </a>
      </div>
    </Section>
  )
}
