import { PlaceStatusesEnum } from '../enums/place-statuses.enum'

interface IPlaceStatus {
  color: string
  title: string
}

export const PlaceStatusRecord: Record<PlaceStatusesEnum, IPlaceStatus> = {
  [PlaceStatusesEnum.Free]: { color: 'green', title: 'Свободно' },
  [PlaceStatusesEnum.Booked]: { color: 'blue', title: 'Забронировано' },
  [PlaceStatusesEnum.Sold]: { color: 'black', title: 'Продано' },
}
