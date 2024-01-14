import { AxiosResponse } from 'axios'
import { ParkingPlaceStatusesEnum } from '../enums/parking-place-statuses.enum'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'
import { adminClient } from './admin-client'

interface IUpdateParkingPlaceDto {
  id: number
  floor: number
  type: ParkingPlaceTypesEnum
  area: number
  currentPrice: number
  previousPrice: number
  status: ParkingPlaceStatusesEnum
}

export function updateParkingPlace(payload: IUpdateParkingPlaceDto) {
  const { id, ...body } = payload
  return adminClient.patch<void, AxiosResponse<void, typeof body>, typeof body>(
    `/parking-places/${id}`,
    body
  )
}
