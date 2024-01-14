import { ParkingPlaceStatusesEnum } from '../enums/parking-place-statuses.enum'

interface IParkingPlaceStatus {
  color: string
  title: string
}

export const ParkingPlaceStatusRecord: Record<
  ParkingPlaceStatusesEnum,
  IParkingPlaceStatus
> = {
  [ParkingPlaceStatusesEnum.Free]: { color: 'green', title: 'Свободно' },
  [ParkingPlaceStatusesEnum.Booked]: { color: 'blue', title: 'Забронировано' },
  [ParkingPlaceStatusesEnum.Sold]: { color: 'black', title: 'Продано' },
}
