import { ParkingPlaceStatusesEnum } from '../enums/parking-place-statuses.enum'

export const ParkingPlaceImagesRecord: Record<ParkingPlaceStatusesEnum, string> = {
  [ParkingPlaceStatusesEnum.Free]: '',
  [ParkingPlaceStatusesEnum.Booked]: '/images/cars/booked-car.png',
  [ParkingPlaceStatusesEnum.Sold]: '/images/cars/sold-car.png',
}
