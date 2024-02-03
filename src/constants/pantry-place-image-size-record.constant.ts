import { PantryPlaceImageTypesEnum } from '../enums/pantry-place-image-types.enum'

type TImageSize = { width: number }

export const PantryPlaceImageSizeRecord: Record<PantryPlaceImageTypesEnum, TImageSize> = {
  [PantryPlaceImageTypesEnum.One]: { width: 3.7 },
  [PantryPlaceImageTypesEnum.Two]: { width: 2.1 },
  [PantryPlaceImageTypesEnum.Three]: { width: 2.1 },
  [PantryPlaceImageTypesEnum.Four]: { width: 1.6 },
  [PantryPlaceImageTypesEnum.Five]: { width: 1.6 },
  [PantryPlaceImageTypesEnum.Six]: { width: 1.7 },
  [PantryPlaceImageTypesEnum.Seven]: { width: 1.2 },
  [PantryPlaceImageTypesEnum.Eight]: { width: 1.2 },
  [PantryPlaceImageTypesEnum.Nine]: { width: 1.2 },
  [PantryPlaceImageTypesEnum.Ten]: { width: 1.2 },
  [PantryPlaceImageTypesEnum.Eleven]: { width: 1.2 },
}
