import { PantryPlaceImageTypesEnum } from '../enums/pantry-place-image-types.enum'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'

type TPantryPlaceImage = Record<PlaceStatusesEnum, string>

export const PantryPlaceImagesRecord: Record<
  PantryPlaceImageTypesEnum,
  TPantryPlaceImage
> = {
  [PantryPlaceImageTypesEnum.One]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-1-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-1-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-1-sold.png',
  },
  [PantryPlaceImageTypesEnum.Two]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-2-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-2-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-2-sold.png',
  },
  [PantryPlaceImageTypesEnum.Three]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-3-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-3-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-3-sold.png',
  },
  [PantryPlaceImageTypesEnum.Four]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-4-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-4-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-4-sold.png',
  },
  [PantryPlaceImageTypesEnum.Five]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-5-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-5-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-5-sold.png',
  },
  [PantryPlaceImageTypesEnum.Six]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-6-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-6-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-6-sold.png',
  },
  [PantryPlaceImageTypesEnum.Seven]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-7-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-7-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-7-sold.png',
  },
  [PantryPlaceImageTypesEnum.Eight]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-8-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-8-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-8-sold.png',
  },
  [PantryPlaceImageTypesEnum.Nine]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-9-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-9-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-9-sold.png',
  },
  [PantryPlaceImageTypesEnum.Ten]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-10-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-10-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-10-sold.png',
  },
  [PantryPlaceImageTypesEnum.Eleven]: {
    [PlaceStatusesEnum.Free]: '/images/pantries/pantry-11-free.png',
    [PlaceStatusesEnum.Booked]: '/images/pantries/pantry-11-booked.png',
    [PlaceStatusesEnum.Sold]: '/images/pantries/pantry-11-sold.png',
  },
}
