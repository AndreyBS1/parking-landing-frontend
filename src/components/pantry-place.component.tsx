import { HoverCard, NumberFormatter } from '@mantine/core'
import clsx from 'clsx'
import { PantryPlaceImageSizeRecord } from '../constants/pantry-place-image-size-record.constant'
import { PantryPlaceImagesRecord } from '../constants/pantry-place-images-record.constant'
import { PantryPlacePositionsRecord } from '../constants/pantry-place-positions-record'
import Button from '../shared-ui/button.component'
import { IPantryPlace } from '../types/pantry-place.type'

interface IPantryPlaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onSelect'> {
  pantryPlace: IPantryPlace
  onSelect: (pantryPlaceId: number) => void
}

export default function PantryPlace(props: IPantryPlaceProps) {
  const { pantryPlace, onSelect, className, style, ...otherProps } = props

  const position = PantryPlacePositionsRecord[pantryPlace.id]
  const image = PantryPlaceImagesRecord[position.imageType][pantryPlace.status]
  const imageSize = PantryPlaceImageSizeRecord[position.imageType]

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
          className={clsx('cursor-pointer', className)}
          style={{
            width: `${imageSize.width}em`,
            top: `${position.top}em`,
            left: `${position.left}em`,
            ...style,
          }}
          {...otherProps}
        >
          {image ? <img src={image} alt="" /> : <div className="w-7 h-[5.35rem]" />}
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <h3 className="mb-2 text-3xl">Кладовая №{pantryPlace.id}</h3>
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
