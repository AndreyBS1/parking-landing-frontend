import { HoverCard, NumberFormatter } from '@mantine/core'
import clsx from 'clsx'
import { PantryPlaceImageSizeRecord } from '../constants/pantry-place-image-size-record.constant'
import { PantryPlaceImagesRecord } from '../constants/pantry-place-images-record.constant'
import { PantryPlacePositionsRecord } from '../constants/pantry-place-positions-record'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'
import Button from '../shared-ui/button.component'
import { IPantryPlace } from '../types/pantry-place.type'
import { Icon } from './icon/icon.component'

interface IPantryPlaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onSelect'> {
  pantryPlace: IPantryPlace
  zoom?: number
  onSelect: (pantryPlaceId: number) => void
}

export default function PantryPlace(props: IPantryPlaceProps) {
  const { pantryPlace, zoom = 1, onSelect, className, style, ...otherProps } = props

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!(pantryPlace.displayedNo in PantryPlacePositionsRecord)) {
    return null
  }

  const position = PantryPlacePositionsRecord[pantryPlace.displayedNo]
  const image = PantryPlaceImagesRecord[position.imageType]
  const imageSize = PantryPlaceImageSizeRecord[position.imageType]

  return (
    <HoverCard
      width="18rem"
      radius="lg"
      withArrow
      arrowSize={20}
      arrowPosition="center"
      closeDelay={0}
      disabled={pantryPlace.status !== PlaceStatusesEnum.Free}
      classNames={{ dropdown: 'py-4 px-7' }}
    >
      <HoverCard.Target>
        <div
          className={clsx(
            pantryPlace.status !== PlaceStatusesEnum.Free
              ? 'cursor-not-allowed'
              : 'cursor-pointer',
            className
          )}
          style={{
            width: `${zoom * imageSize.width}rem`,
            top: `${zoom * position.top}rem`,
            left: `${zoom * position.left}rem`,
            ...style,
          }}
          {...otherProps}
        >
          <Icon
            name={image}
            color={clsx(
              pantryPlace.status === PlaceStatusesEnum.Free && '#5ABA00',
              pantryPlace.status === PlaceStatusesEnum.Booked && '#F9B004',
              pantryPlace.status === PlaceStatusesEnum.Sold && '#D63810'
            )}
          />
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <h3 className="mb-2 text-xl">Кладовая №{pantryPlace.displayedNo}</h3>
        <div className="mb-1 flex justify-between text-xs">
          <p>ПЛОЩАДЬ:</p>
          <p className="uppercase">{pantryPlace.area} м2</p>
        </div>
        <div className="h-10 flex justify-between text-xs">
          <p>СТОИМОСТЬ:</p>
          <div>
            {pantryPlace.previousPrice > 0 && (
              <NumberFormatter
                suffix="₽"
                thousandSeparator=" "
                value={pantryPlace.previousPrice}
                className="block line-through"
              />
            )}
            <NumberFormatter
              suffix="₽"
              thousandSeparator=" "
              value={pantryPlace.currentPrice}
            />
          </div>
        </div>
        <Button className="w-full py-1 text-xs" onClick={() => onSelect(pantryPlace.id)}>
          Забронировать
        </Button>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
