import { PlaceStatusesEnum } from '../enums/place-statuses.enum'

interface IParkingPlaceStatus {
  color: string
  title: string
}

export const ParkingPlaceStatusRecord: Record<PlaceStatusesEnum, IParkingPlaceStatus> = {
  [PlaceStatusesEnum.Free]: { color: 'green', title: 'Свободно' },
  [PlaceStatusesEnum.Booked]: { color: 'blue', title: 'Забронировано' },
  [PlaceStatusesEnum.Sold]: { color: 'black', title: 'Продано' },
}
