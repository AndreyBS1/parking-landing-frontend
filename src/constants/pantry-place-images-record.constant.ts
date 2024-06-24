import { TIconTypes } from '../components/icon/icon.component'

export const PantryPlaceImagesRecord: TIconTypes[] = Array.from(Array(94).keys()).map(
  (number) => `pantry-${number + 1}` as TIconTypes
)
