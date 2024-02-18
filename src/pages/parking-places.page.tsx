import {
  Button,
  Group,
  Loader,
  Modal,
  NumberFormatter,
  NumberInput,
  Pill,
  Select,
  Table,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getParkingPlaces } from '../api/get-parking-places'
import ParkingPlaceUpdateForm from '../components/parking-place-update-form.component'
import { ParkingPlaceTypesRecord } from '../constants/parking-place-types-record.constant'
import { PlaceStatusRecord } from '../constants/place-status-record.constant'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'
import { PlacePriceTypesEnum } from '../enums/place-price-types.enum'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'
import { IParkingPlace } from '../types/parking-place.type'

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

const priceTypeFilterData = [
  { label: 'Со скидкой', value: String(PlacePriceTypesEnum.Promotional) },
  { label: 'Без скидки', value: String(PlacePriceTypesEnum.NonPromotional) },
]

const statusFilterData = [
  { label: 'Свободно', value: String(PlaceStatusesEnum.Free) },
  { label: 'Забронировано', value: String(PlaceStatusesEnum.Booked) },
  { label: 'Продано', value: String(PlaceStatusesEnum.Sold) },
]

type TFilterOptions = {
  number: string | null
  floor: string | null
  type: string | null
  priceType: string | null
  status: string | null
}

export default function ParkingPlacesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['parking-places'],
    queryFn: getParkingPlaces,
  })
  const [isModalOpened, { open: openModal, close: closeModal }] = useDisclosure()

  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    number: null,
    floor: null,
    type: null,
    priceType: null,
    status: null,
  })
  const [selectedParkingPlace, setSelectedParkingPlace] = useState<IParkingPlace | null>(
    null
  )

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

  const filteredData = data.filter((parkingPlace) => {
    let isParkingPlaceValid = true
    const { number, floor, type, priceType, status } = filterOptions
    if (number && !String(parkingPlace.displayedNo).startsWith(number)) {
      isParkingPlaceValid = false
    }
    if (floor && parkingPlace.floor !== Number(floor)) {
      isParkingPlaceValid = false
    }
    if (type && parkingPlace.type !== Number(type)) {
      isParkingPlaceValid = false
    }
    if (priceType !== null) {
      const priceTypeValue = Number(priceType)
      if (
        priceTypeValue === PlacePriceTypesEnum.Promotional &&
        parkingPlace.previousPrice === 0
      ) {
        isParkingPlaceValid = false
      }
      if (
        priceTypeValue === PlacePriceTypesEnum.NonPromotional &&
        parkingPlace.previousPrice !== 0
      ) {
        isParkingPlaceValid = false
      }
    }
    if (status && parkingPlace.status !== Number(status)) {
      isParkingPlaceValid = false
    }
    return isParkingPlaceValid
  })

  const handleFilterOptionChange = (
    option: keyof TFilterOptions,
    value: string | null
  ) => {
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [option]: value,
    }))
  }

  const handleUpdateButtonClick = (parkingPlace: IParkingPlace) => {
    setSelectedParkingPlace(parkingPlace)
    openModal()
  }

  return (
    <>
      <Group mb="xl">
        <NumberInput
          label="Номер места"
          placeholder="Введите номер"
          value={filterOptions.number ?? ''}
          min={1}
          onChange={(value) =>
            handleFilterOptionChange('number', value ? String(value) : null)
          }
        />
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
        <Select
          label="Тип цены"
          placeholder="Выберите тип"
          data={priceTypeFilterData}
          value={filterOptions.priceType}
          onChange={(value) => handleFilterOptionChange('priceType', value)}
        />
        <Select
          label="Статус"
          placeholder="Выберите статус"
          data={statusFilterData}
          value={filterOptions.status}
          onChange={(value) => handleFilterOptionChange('status', value)}
        />
      </Group>
      <Table striped={filteredData.length > 0} highlightOnHover={filteredData.length > 0}>
        <Table.Thead>
          <Table.Th>№</Table.Th>
          <Table.Th>Этаж</Table.Th>
          <Table.Th>Тип</Table.Th>
          <Table.Th>Цена</Table.Th>
          <Table.Th>Статус</Table.Th>
          <Table.Th></Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {filteredData.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <div className="h-96 flex justify-center items-center">
                  <p className="text-2xl font-semibold opacity-30">Места не найдены</p>
                </div>
              </Table.Td>
            </Table.Tr>
          )}
          {filteredData.map((parkingPlace) => (
            <Table.Tr key={parkingPlace.id}>
              <Table.Td>{parkingPlace.displayedNo}</Table.Td>
              <Table.Td>{parkingPlace.floor + 1}</Table.Td>
              <Table.Td>{ParkingPlaceTypesRecord[parkingPlace.type]}</Table.Td>
              <Table.Td>
                {parkingPlace.previousPrice > 0 && (
                  <NumberFormatter
                    suffix="₽"
                    thousandSeparator=" "
                    value={parkingPlace.previousPrice}
                    className="block line-through"
                  />
                )}
                <NumberFormatter
                  suffix="₽"
                  thousandSeparator=" "
                  value={parkingPlace.currentPrice}
                />
              </Table.Td>
              <Table.Td>
                <Pill color={PlaceStatusRecord[parkingPlace.status].color}>
                  {PlaceStatusRecord[parkingPlace.status].title}
                </Pill>
              </Table.Td>
              <Table.Td>
                <Button
                  classNames={{ root: 'bg-black' }}
                  onClick={() => handleUpdateButtonClick(parkingPlace)}
                >
                  Обновить
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={isModalOpened}
        title={`Парковочное место №${selectedParkingPlace?.displayedNo}`}
        centered
        classNames={{ title: 'text-xl' }}
        onClose={closeModal}
      >
        {selectedParkingPlace !== null && (
          <ParkingPlaceUpdateForm
            parkingPlace={selectedParkingPlace}
            onSubmit={closeModal}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </>
  )
}
