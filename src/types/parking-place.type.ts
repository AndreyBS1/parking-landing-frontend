import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'

export interface IParkingPlace {
  id: number
  displayedNo: number
  floor: number
  type: ParkingPlaceTypesEnum
  area: number
  currentPrice: number
  previousPrice: number
  status: PlaceStatusesEnum
  updatedAt: Date
}
