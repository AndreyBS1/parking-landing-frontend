import { HoverCard, NumberFormatter } from '@mantine/core'
import clsx from 'clsx'
import { ParkingPlaceImagesRecord } from '../constants/parking-place-images-record.component'
import { ParkingPlacePositionsRecord } from '../constants/parking-place-positions-record'
import { ParkingPlaceTypesRecord } from '../constants/parking-place-types-record.constant'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'
import Button from '../shared-ui/button.component'
import { IParkingPlace } from '../types/parking-place.type'

interface IParkingPlaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onSelect'> {
  parkingPlace: IParkingPlace
  zoom?: number
  onSelect: (parkingPlaceId: number) => void
}

export default function ParkingPlace(props: IParkingPlaceProps) {
  const { parkingPlace, zoom = 1, onSelect, className, style, ...otherProps } = props

  const image = ParkingPlaceImagesRecord[parkingPlace.status]
  const type = ParkingPlaceTypesRecord[parkingPlace.type]
  const position = ParkingPlacePositionsRecord[parkingPlace.displayedNo]

  return (
    <HoverCard
      width="18rem"
      radius="lg"
      withArrow
      arrowSize={20}
      arrowPosition="center"
      closeDelay={0}
      disabled={parkingPlace.status !== PlaceStatusesEnum.Free}
      classNames={{ dropdown: 'py-4 px-7' }}
    >
      <HoverCard.Target>
        <div
          className={clsx(
            parkingPlace.status !== PlaceStatusesEnum.Free
              ? 'cursor-not-allowed'
              : 'cursor-pointer',
            className
          )}
          style={{
            width: `${zoom * 1.75}rem`,
            top: `${zoom * position.top}rem`,
            left: `${zoom * position.left}rem`,
            rotate: `${position.rotationDegree}deg`,
            ...style,
          }}
          {...otherProps}
        >
          {image ? (
            <img src={image} alt="" />
          ) : (
            <div style={{ height: `${zoom * 5.35}rem`, width: `${zoom * 1.75}rem` }} />
          )}
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <h3 className="mb-2 text-xl">Место №{parkingPlace.displayedNo}</h3>
        <div className="mb-1 flex justify-between text-xs">
          <p>ТИП МЕСТА:</p>
          <p className="uppercase">{type}</p>
        </div>
        <div className="mb-1 flex justify-between text-xs">
          <p>ПЛОЩАДЬ:</p>
          <p className="uppercase">{parkingPlace.area} м2</p>
        </div>
        <div className="h-10 flex justify-between text-xs">
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
        <Button className="w-full py-1 text-xs" onClick={() => onSelect(parkingPlace.id)}>
          Забронировать
        </Button>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
