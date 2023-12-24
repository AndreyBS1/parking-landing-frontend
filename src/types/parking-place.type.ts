import { ParkingPlaceStatusesEnum } from '../enums/parking-place-statuses.enum'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'

export interface IParkingPlace {
  id: number
  floor: number
  type: ParkingPlaceTypesEnum
  area: number
  currentPrice: number
  previousPrice: number
  status: ParkingPlaceStatusesEnum
  updatedAt: Date
}
