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
import { getPantryPlaces } from '../api/get-pantry-places'
import PantryPlaceUpdateForm from '../components/pantry-place-update-form.component'
import { PlaceStatusRecord } from '../constants/place-status-record.constant'
import { PlacePriceTypesEnum } from '../enums/place-price-types.enum'
import { PlaceStatusesEnum } from '../enums/place-statuses.enum'
import { IPantryPlace } from '../types/pantry-place.type'

const floorFilterData = [
  { label: '2', value: '1' },
  { label: '3', value: '2' },
  { label: '4', value: '3' },
  { label: '5', value: '4' },
  { label: '6', value: '5' },
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
  priceType: string | null
  status: string | null
}

export default function PantryPlacesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pantry-places'],
    queryFn: getPantryPlaces,
  })
  const [isModalOpened, { open: openModal, close: closeModal }] = useDisclosure()

  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    number: null,
    floor: null,
    priceType: null,
    status: null,
  })
  const [selectedPantryPlace, setSelectedPantryPlace] = useState<IPantryPlace | null>(
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

  const filteredData = data.filter((pantryPlace) => {
    let isPantryPlaceValid = true
    const { number, floor, priceType, status } = filterOptions
    if (number && !String(pantryPlace.displayedNo).startsWith(number)) {
      isPantryPlaceValid = false
    }
    if (floor && pantryPlace.floor !== Number(floor)) {
      isPantryPlaceValid = false
    }
    if (priceType !== null) {
      const priceTypeValue = Number(priceType)
      if (
        priceTypeValue === PlacePriceTypesEnum.Promotional &&
        pantryPlace.previousPrice === 0
      ) {
        isPantryPlaceValid = false
      }
      if (
        priceTypeValue === PlacePriceTypesEnum.NonPromotional &&
        pantryPlace.previousPrice !== 0
      ) {
        isPantryPlaceValid = false
      }
    }
    if (status && pantryPlace.status !== Number(status)) {
      isPantryPlaceValid = false
    }
    return isPantryPlaceValid
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

  const handleUpdateButtonClick = (pantryPlace: IPantryPlace) => {
    setSelectedPantryPlace(pantryPlace)
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
          {filteredData.map((pantryPlace) => (
            <Table.Tr key={pantryPlace.id}>
              <Table.Td>{pantryPlace.displayedNo}</Table.Td>
              <Table.Td>{pantryPlace.floor + 1}</Table.Td>
              <Table.Td>
                {pantryPlace.previousPrice > 0 && (
                  <NumberFormatter
                    suffix="₽"
                    thousandSeparator=" "
                    value={pantryPlace.previousPrice}
                    className="block line-through"
                  />
                )}
                <NumberFormatter
                  suffix="₽"
                  thousandSeparator=" "
                  value={pantryPlace.currentPrice}
                />
              </Table.Td>
              <Table.Td>
                <Pill color={PlaceStatusRecord[pantryPlace.status].color}>
                  {PlaceStatusRecord[pantryPlace.status].title}
                </Pill>
              </Table.Td>
              <Table.Td>
                <Button
                  classNames={{ root: 'bg-black' }}
                  onClick={() => handleUpdateButtonClick(pantryPlace)}
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
        title={`Кладовое место №${selectedPantryPlace?.displayedNo}`}
        centered
        classNames={{ title: 'text-xl' }}
        onClose={closeModal}
      >
        {selectedPantryPlace !== null && (
          <PantryPlaceUpdateForm
            pantryPlace={selectedPantryPlace}
            onSubmit={closeModal}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </>
  )
}
