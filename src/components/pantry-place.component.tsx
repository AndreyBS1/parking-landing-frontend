import { HoverCard, NumberFormatter } from '@mantine/core'
import clsx from 'clsx'
import { PantryPlaceImageSizeRecord } from '../constants/pantry-place-image-size-record.constant'
import { PantryPlaceImagesRecord } from '../constants/pantry-place-images-record.constant'
import { PantryPlacePositionsRecord } from '../constants/pantry-place-positions-record'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'
import Button from '../shared-ui/button.component'
import { IPantryPlace } from '../types/pantry-place.type'

interface IPantryPlaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onSelect'> {
  pantryPlace: IPantryPlace
  zoom?: number
  onSelect: (pantryPlaceId: number) => void
}

export default function PantryPlace(props: IPantryPlaceProps) {
  const { pantryPlace, zoom = 1, onSelect, className, style, ...otherProps } = props

  const position = PantryPlacePositionsRecord[pantryPlace.displayedNo]
  const image = PantryPlaceImagesRecord[position.imageType][pantryPlace.status]
  const imageSize = PantryPlaceImageSizeRecord[position.imageType]

  return (
    <HoverCard
      width="22rem"
      radius="xl"
      withArrow
      arrowSize={20}
      arrowPosition="center"
      disabled={pantryPlace.status !== PlaceStatusesEnum.Free}
      classNames={{ dropdown: 'py-5 px-8' }}
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
          <img src={image} alt="" />
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <h3 className="mb-2 text-3xl">Кладовая №{pantryPlace.displayedNo}</h3>
        <div className="h-16 flex justify-between">
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
        <Button className="w-full py-1" onClick={() => onSelect(pantryPlace.id)}>
          Забронировать
        </Button>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
