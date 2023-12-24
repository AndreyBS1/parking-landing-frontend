import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getParkingPlaces } from '../api/get-parking-places'
import { IParkingPlace } from '../types/parking-place.type'

export function useGetParkingPlacesQuery() {
  return useQuery<IParkingPlace[], AxiosError>({
    queryKey: ['parking-places'],
    queryFn: getParkingPlaces,
  })
}
