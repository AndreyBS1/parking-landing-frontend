import { PantryPlaceImageTypesEnum } from '../enums/pantry-place-image-types.enum'

interface IPantryPlacePosition {
  top: number
  left: number
  imageType: PantryPlaceImageTypesEnum
}

export const PantryPlacePositionsRecord: Record<number, IPantryPlacePosition> = {
  // 1st floor
  1: { top: 11, left: 0.15, imageType: PantryPlaceImageTypesEnum.One },
  2: { top: 7.1, left: 7.1, imageType: PantryPlaceImageTypesEnum.Two },
  3: { top: 7.1, left: 9.3, imageType: PantryPlaceImageTypesEnum.Three },
  4: { top: 11, left: 0.15, imageType: PantryPlaceImageTypesEnum.One },
  5: { top: 7.1, left: 7.1, imageType: PantryPlaceImageTypesEnum.Two },
  6: { top: 7.1, left: 9.3, imageType: PantryPlaceImageTypesEnum.Three },
  7: { top: 7.6, left: 44.3, imageType: PantryPlaceImageTypesEnum.Four },
  8: { top: 7.6, left: 46.1, imageType: PantryPlaceImageTypesEnum.Five },
  9: { top: 7.6, left: 47.9, imageType: PantryPlaceImageTypesEnum.Four },
  10: { top: 7.6, left: 49.7, imageType: PantryPlaceImageTypesEnum.Four },
  11: { top: 7.6, left: 51.4, imageType: PantryPlaceImageTypesEnum.Six },
  12: { top: 11, left: 0.15, imageType: PantryPlaceImageTypesEnum.One },
  13: { top: 7.1, left: 7.1, imageType: PantryPlaceImageTypesEnum.Two },
  14: { top: 7.1, left: 9.3, imageType: PantryPlaceImageTypesEnum.Three },
  15: { top: 11, left: 0.15, imageType: PantryPlaceImageTypesEnum.One },
  16: { top: 7.1, left: 7.1, imageType: PantryPlaceImageTypesEnum.Two },
  17: { top: 7.1, left: 9.3, imageType: PantryPlaceImageTypesEnum.Three },
  18: { top: 11, left: 0.15, imageType: PantryPlaceImageTypesEnum.One },
  19: { top: 7.1, left: 7.1, imageType: PantryPlaceImageTypesEnum.Two },
  20: { top: 7.1, left: 9.3, imageType: PantryPlaceImageTypesEnum.Three },
  21: { top: 39.7, left: 46.6, imageType: PantryPlaceImageTypesEnum.Seven },
  22: { top: 39.7, left: 47.95, imageType: PantryPlaceImageTypesEnum.Eight },
  23: { top: 39.7, left: 49.3, imageType: PantryPlaceImageTypesEnum.Nine },
  24: { top: 39.7, left: 50.6, imageType: PantryPlaceImageTypesEnum.Ten },
  25: { top: 39.7, left: 51.95, imageType: PantryPlaceImageTypesEnum.Eleven },
}
