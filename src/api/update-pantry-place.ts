import { AxiosResponse } from 'axios'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'
import { adminClient } from './admin-client'

interface IUpdatePantryPlaceDto {
  id: number
  floor: number
  area: number
  currentPrice: number
  previousPrice: number
  status: PlaceStatusesEnum
}

export function updatePantryPlace(payload: IUpdatePantryPlaceDto) {
  const { id, ...body } = payload
  return adminClient.patch<void, AxiosResponse<void, typeof body>, typeof body>(
    `/pantry-places/${id}`,
    body
  )
}
