import { Group, Loader, Select } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getParkingPlaces } from '../api/get-parking-places'
import UpdatePlacesForm from '../components/update-places-form.component'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'

const floorFilterData = [
  { label: '2', value: '1' },
  { label: '3', value: '2' },
  { label: '4', value: '3' },
  { label: '5', value: '4' },
  { label: '6', value: '5' },
]

const placeTypeFilterData = [
  { label: 'Cтандарт', value: String(ParkingPlaceTypesEnum.Standard) },
  { label: 'Комфорт', value: String(ParkingPlaceTypesEnum.Comfort) },
  { label: 'Премиум', value: String(ParkingPlaceTypesEnum.Premium) },
]

type TFilterOptions = {
  floor: string | null
  type: string | null
}

export default function PlaceParametersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['parking-places'],
    queryFn: getParkingPlaces,
  })

  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    floor: null,
    type: null,
  })

  if (isLoading) {
    return (
      <div className="h-[48.5rem] max-w-[1920px] mx-auto flex flex-col justify-center items-center">
        <Loader color="black" />
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div className="h-[48.5rem] max-w-[1920px] mx-auto flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-2">Похоже, что возникла какая-то ошибка</h2>
        <p className="text-xl mb-6">
          Пожалуйста, попробуйте обновить страницу или зайти позже
        </p>
      </div>
    )
  }

  const placeExample =
    data.find((parkingPlace) => {
      let isParkingPlaceValid = true
      const { floor, type } = filterOptions
      if (floor && parkingPlace.floor !== Number(floor)) {
        isParkingPlaceValid = false
      }
      if (type && parkingPlace.type !== Number(type)) {
        isParkingPlaceValid = false
      }
      return isParkingPlaceValid
    }) ?? null

  const placeTypeLabel =
    placeTypeFilterData.find(({ value }) => value === filterOptions.type)?.label || ''

  const handleFilterOptionChange = (
    option: keyof TFilterOptions,
    value: string | null
  ) => {
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [option]: value,
    }))
  }

  return (
    <>
      <Group mb="xl">
        <Select
          label="Этаж"
          placeholder="Выберите этаж"
          data={floorFilterData}
          value={filterOptions.floor}
          onChange={(value) => handleFilterOptionChange('floor', value)}
        />
        <Select
          label="Тип места"
          placeholder="Выберите тип"
          data={placeTypeFilterData}
          value={filterOptions.type}
          onChange={(value) => handleFilterOptionChange('type', value)}
        />
      </Group>
      {filterOptions.type === null && (
        <div className="h-96 flex justify-center items-center">
          <p className="text-2xl font-semibold opacity-30">
            Чтобы обновить параметры, выберите тип парковочного места
          </p>
        </div>
      )}
      {placeExample === null && (
        <div className="h-96 flex justify-center items-center">
          <p className="text-2xl font-semibold opacity-30">
            Парковочного места с такими параметрами не существует
          </p>
        </div>
      )}
      {filterOptions.type !== null && placeExample !== null && (
        <>
          <p className="mb-6 text-lg">
            Параметры места "{placeTypeLabel}" для{' '}
            {filterOptions.floor === null
              ? 'всех этажей'
              : `${Number(filterOptions.floor) + 1} этажа`}
          </p>
          <UpdatePlacesForm
            placeType={filterOptions.type}
            floor={filterOptions.floor ?? undefined}
            defaultValues={{
              area: String(placeExample.area),
              previousPrice: String(placeExample.previousPrice),
              currentPrice: String(placeExample.currentPrice),
            }}
            onSubmit={() => null}
            onError={() => null}
          />
        </>
      )}
    </>
  )
}
