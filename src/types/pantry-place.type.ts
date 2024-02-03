import { PlaceStatusesEnum } from '../enums/place-statuses.enum'

export interface IPantryPlace {
  id: number
  floor: number
  area: number
  currentPrice: number
  previousPrice: number
  status: PlaceStatusesEnum
  updatedAt: Date
}
