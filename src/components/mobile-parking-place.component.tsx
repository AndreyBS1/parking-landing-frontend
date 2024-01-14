import clsx from 'clsx'
import { ParkingPlaceImagesRecord } from '../constants/parking-place-images-record.component'
import { ParkingPlacePositionsRecord } from '../constants/parking-place-postions-record'
import { IParkingPlace } from '../types/parking-place.type'

interface IMobileParkingPlaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  parkingPlace: IParkingPlace
}

export default function MobileParkingPlace(props: IMobileParkingPlaceProps) {
  const { parkingPlace, className, style, ...otherProps } = props

  const image = ParkingPlaceImagesRecord[parkingPlace.status]
  const position = ParkingPlacePositionsRecord[parkingPlace.id]

  return (
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
      <img src={image} alt="" />
    </div>
  )
}
