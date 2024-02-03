import { HoverCard, NumberFormatter } from '@mantine/core'
import clsx from 'clsx'
import { ParkingPlaceImagesRecord } from '../constants/parking-place-images-record.component'
import { ParkingPlacePositionsRecord } from '../constants/parking-place-positions-record'
import { ParkingPlaceTypesRecord } from '../constants/parking-place-types-record.constant'
import Button from '../shared-ui/button.component'
import { IParkingPlace } from '../types/parking-place.type'

interface IParkingPlaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onSelect'> {
  parkingPlace: IParkingPlace
  onSelect: (parkingPlaceId: number) => void
}

export default function ParkingPlace(props: IParkingPlaceProps) {
  const { parkingPlace, onSelect, className, style, ...otherProps } = props

  const image = ParkingPlaceImagesRecord[parkingPlace.status]
  const type = ParkingPlaceTypesRecord[parkingPlace.type]
  const position = ParkingPlacePositionsRecord[parkingPlace.id]

  return (
    <HoverCard
      width="22rem"
      radius="xl"
      withArrow
      arrowSize={20}
      arrowPosition="center"
      classNames={{ dropdown: 'py-5 px-8' }}
    >
      <HoverCard.Target>
        <div
          className={clsx('cursor-pointer w-7', className)}
          style={{
            top: `${position.top}rem`,
            left: `${position.left}rem`,
            rotate: `${position.rotationDegree}deg`,
            ...style,
          }}
          {...otherProps}
        >
          {image ? <img src={image} alt="" /> : <div className="w-7 h-[5.35rem]" />}
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <h3 className="mb-2 text-3xl">Место №{parkingPlace.id}</h3>
        <div className="mb-1 flex justify-between">
          <p>ТИП МЕСТА:</p>
          <p className="uppercase">{type}</p>
        </div>
        <div className="h-16 flex justify-between">
          <p>СТОИМОСТЬ:</p>
          <div>
            {parkingPlace.previousPrice > 0 && (
              <NumberFormatter
                suffix="₽"
                thousandSeparator=" "
                value={parkingPlace.previousPrice}
                className="block line-through"
              />
            )}
            <NumberFormatter
              suffix="₽"
              thousandSeparator=" "
              value={parkingPlace.currentPrice}
            />
          </div>
        </div>
        <Button className="w-full py-1" onClick={() => onSelect(parkingPlace.id)}>
          Забронировать
        </Button>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
