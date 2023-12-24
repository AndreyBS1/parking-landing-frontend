import { AxiosResponse } from 'axios'
import { IParkingPlace } from '../types/parking-place.type'
import { baseClient } from './base-client'

export async function getParkingPlaces() {
  const { data } = await baseClient.get<
    IParkingPlace[],
    AxiosResponse<IParkingPlace[], void>,
    void
  >('/parking-places')
  return data
}
