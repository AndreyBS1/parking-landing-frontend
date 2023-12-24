import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'

export const ParkingPlaceTypesRecord: Record<ParkingPlaceTypesEnum, string> = {
  [ParkingPlaceTypesEnum.Standard]: 'Стандарт',
  [ParkingPlaceTypesEnum.Comfort]: 'Комфорт',
  [ParkingPlaceTypesEnum.Premium]: 'Премиум',
}
