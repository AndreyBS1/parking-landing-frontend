import { AxiosResponse } from 'axios'
import { IPantryPlace } from '../types/pantry-place.type'
import { baseClient } from './base-client'

export async function getPantryPlaces() {
  const { data } = await baseClient.get<
    IPantryPlace[],
    AxiosResponse<IPantryPlace[], void>,
    void
  >('/pantry-places')
  return data
}
