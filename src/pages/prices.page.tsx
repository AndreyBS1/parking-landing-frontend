import { Group, Loader, Select } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getParkingPlaces } from '../api/get-parking-places'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'

const floorFilterData = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
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

export default function PricesPage() {
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
    data.filter((parkingPlace) => {
      let isParkingPlaceValid = true
      const { floor, type } = filterOptions
      if (floor && parkingPlace.floor !== Number(floor)) {
        isParkingPlaceValid = false
      }
      if (type && parkingPlace.type !== Number(type)) {
        isParkingPlaceValid = false
      }
      return isParkingPlaceValid
    })[0] || null

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
            Чтобы обновить цены, выберите тип парковочного места
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
          <p className="text-lg">
            Цены для места "{placeTypeLabel}" на{' '}
            {filterOptions.floor === null
              ? 'всех этажей'
              : `${filterOptions.floor} этажа`}
          </p>
        </>
      )}
    </>
  )
}
