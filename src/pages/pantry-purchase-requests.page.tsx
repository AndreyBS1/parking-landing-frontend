import {
  Button,
  Group,
  Loader,
  Modal,
  NumberInput,
  Pill,
  Select,
  Stack,
  Table,
  TextInput,
} from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { deletePantryPurchaseRequest } from '../api/delete-pantry-purchase-request'
import { getPantryPurchaseRequests } from '../api/get-pantry-purchase-requests'
import { queryClient } from '../api/query-client'
import { updatePantryPurchaseRequestStatus } from '../api/update-pantry-purchase-request-status'
import { PurchaseRequestStatusRecord } from '../constants/purchase-request-status-record.constant'
import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'
import { IPantryPurchaseRequest } from '../types/pantry-purchase-request.type'

enum ModalTypes {
  Update,
  Delete,
}

enum DateFilterTypeEnum {
  NewFirst,
  OldFirst,
}

const dateFilterData = [
  { label: 'Сначала новые', value: String(DateFilterTypeEnum.NewFirst) },
  { label: 'Сначала старые', value: String(DateFilterTypeEnum.OldFirst) },
]

const statusFilterData = [
  // { label: 'В ожидании', value: String(PurchaseRequestStatusesEnum.Idle) },
  { label: 'Забронировано', value: String(PurchaseRequestStatusesEnum.InProcess) },
  { label: 'Продано', value: String(PurchaseRequestStatusesEnum.Approved) },
  { label: 'Отклонено', value: String(PurchaseRequestStatusesEnum.Rejected) },
]

type TFilterOptions = {
  date: string | null
  placeNumber: string | null
  status: string | null
}

export default function PantryPurchaseRequestsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pantry-purchase-requests'],
    queryFn: getPantryPurchaseRequests,
  })

  const {
    mutate: updatePurchaseRequestStatusMutation,
    isPending: isUpdateStatusPending,
  } = useMutation({
    mutationFn: updatePantryPurchaseRequestStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantry-purchase-requests'] })
      setOpenedModalType(null)
    },
  })

  const { mutate: deletePurchaseRequestMutation, isPending: isDeletePending } =
    useMutation({
      mutationFn: deletePantryPurchaseRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pantry-purchase-requests'] })
        setOpenedModalType(null)
      },
    })

  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    date: String(DateFilterTypeEnum.NewFirst),
    placeNumber: null,
    status: null,
  })

  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)

  const [selectedPurchaseRequest, setSelectedPurchaseRequest] =
    useState<IPantryPurchaseRequest | null>(null)

  if (isLoading) {
    return (
      <div
        id="parking-plan"
        className="h-[48.5rem] max-w-[1920px] mx-auto flex flex-col justify-center items-center"
      >
        <Loader color="black" />
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div
        id="parking-plan"
        className="h-[48.5rem] max-w-[1920px] mx-auto flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl mb-2">Похоже, что возникла какая-то ошибка</h2>
        <p className="text-xl mb-6">
          Пожалуйста, попробуйте обновить страницу или зайти позже
        </p>
      </div>
    )
  }

  const filteredData = data.filter((purchaseRequest) => {
    let isPurchaseRequestValid = true
    const { placeNumber, status } = filterOptions
    if (
      placeNumber &&
      !String(purchaseRequest.pantryPlace.displayedNo).startsWith(placeNumber)
    ) {
      isPurchaseRequestValid = false
    }
    if (status && purchaseRequest.status !== Number(status)) {
      isPurchaseRequestValid = false
    }
    return isPurchaseRequestValid
  })

  filteredData.sort((requestA, requestB) => {
    const createdTimestampA = new Date(requestA.createdAt).getTime()
    const createdTimestampB = new Date(requestB.createdAt).getTime()
    if (filterOptions.date === String(DateFilterTypeEnum.NewFirst)) {
      return createdTimestampB - createdTimestampA
    }
    if (filterOptions.date === String(DateFilterTypeEnum.OldFirst)) {
      return createdTimestampA - createdTimestampB
    }
    throw new Error('Unknown date filter type')
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

  const handleShowMoreButtonClick = (purchaseRequest: IPantryPurchaseRequest) => {
    setSelectedPurchaseRequest(purchaseRequest)
    setOpenedModalType(ModalTypes.Update)
  }

  const handleDeleteButtonClick = (purchaseRequest: IPantryPurchaseRequest) => {
    setSelectedPurchaseRequest(purchaseRequest)
    setOpenedModalType(ModalTypes.Delete)
  }

  const handlePurchaseRequestDelete = () => {
    if (!selectedPurchaseRequest) {
      return
    }
    deletePurchaseRequestMutation(selectedPurchaseRequest.id)
  }

  return (
    <>
      <Group mb="xl">
        <Select
          label="Дата"
          placeholder="Выберите порядок"
          data={dateFilterData}
          value={filterOptions.date}
          defaultValue={dateFilterData[0].value}
          allowDeselect={false}
          onChange={(value) => handleFilterOptionChange('date', value)}
        />
        <NumberInput
          label="Номер места"
          placeholder="Введите номер"
          value={filterOptions.placeNumber ?? ''}
          min={1}
          onChange={(value) =>
            handleFilterOptionChange('placeNumber', value ? String(value) : null)
          }
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
          <Table.Th>Дата</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Телефон</Table.Th>
          <Table.Th>Почта</Table.Th>
          <Table.Th>Номер к/м</Table.Th>
          <Table.Th>Статус</Table.Th>
          <Table.Th></Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {filteredData.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <div className="h-96 flex justify-center items-center">
                  <p className="text-2xl font-semibold opacity-30">Заявки не найдены</p>
                </div>
              </Table.Td>
            </Table.Tr>
          )}
          {filteredData.map((purchaseRequest) => (
            <Table.Tr key={purchaseRequest.id}>
              <Table.Td>
                {new Date(purchaseRequest.createdAt).toLocaleDateString('ru')}
              </Table.Td>
              <Table.Td>{purchaseRequest.customerName}</Table.Td>
              <Table.Td>{purchaseRequest.customerPhoneNumber}</Table.Td>
              <Table.Td>{purchaseRequest.customerEmail}</Table.Td>
              <Table.Td>{purchaseRequest.pantryPlace.displayedNo}</Table.Td>
              <Table.Td>
                <Pill color={PurchaseRequestStatusRecord[purchaseRequest.status].color}>
                  {PurchaseRequestStatusRecord[purchaseRequest.status].title}
                </Pill>
              </Table.Td>
              <Table.Td w="20rem">
                <Group>
                  <Button
                    classNames={{ root: 'bg-black' }}
                    onClick={() => handleShowMoreButtonClick(purchaseRequest)}
                  >
                    Подробнее
                  </Button>
                  <Button
                    classNames={{ root: 'bg-red' }}
                    onClick={() => handleDeleteButtonClick(purchaseRequest)}
                  >
                    <img
                      src="/icons/cross-white-icon.svg"
                      alt="Delete request"
                      className="w-6 h-6"
                    />
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={openedModalType === ModalTypes.Update}
        title={`Запрос на покупку кладовой №${selectedPurchaseRequest?.pantryPlace.displayedNo}`}
        centered
        size="xl"
        classNames={{ title: 'text-xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <Group grow mb="xl" align="top">
          <Stack gap="md">
            <TextInput
              label="Дата оформления запроса"
              value={new Date(
                selectedPurchaseRequest?.createdAt || ''
              ).toLocaleDateString('ru')}
              readOnly
            />
            <TextInput
              label="Имя покупателя"
              value={selectedPurchaseRequest?.customerName}
              readOnly
            />
            <TextInput
              label="Телефон покупателя"
              value={selectedPurchaseRequest?.customerPhoneNumber}
              readOnly
            />
            <TextInput
              label="Почта покупателя"
              value={selectedPurchaseRequest?.customerEmail}
              readOnly
            />
          </Stack>
          <Stack gap="md">
            <TextInput
              label="Площадь места"
              value={selectedPurchaseRequest?.pantryPlace.area}
              readOnly
              rightSection={<p>м2</p>}
            />
            <TextInput
              label="Старая цена места"
              value={selectedPurchaseRequest?.pantryPlace.previousPrice || 'Не указана'}
              readOnly
              rightSection={<p>₽</p>}
            />
            <TextInput
              label="Текущая цена места"
              value={selectedPurchaseRequest?.pantryPlace.currentPrice}
              readOnly
              rightSection={<p>₽</p>}
            />
          </Stack>
        </Group>
        <Group grow>
          <Button
            variant="outline"
            loading={isUpdateStatusPending}
            classNames={{ root: 'border-black', label: 'text-black' }}
            onClick={() => setOpenedModalType(null)}
          >
            Закрыть
          </Button>
          {/* {selectedPurchaseRequest?.status !== PurchaseRequestStatusesEnum.Idle && (
            <Button
              loading={isUpdateStatusPending}
              classNames={{ root: 'bg-black' }}
              onClick={() =>
                updatePurchaseRequestStatusMutation({
                  id: selectedPurchaseRequest?.id || 0,
                  status: PurchaseRequestStatusesEnum.Idle,
                })
              }
            >
              Сбросить
            </Button>
          )} */}
          {selectedPurchaseRequest?.status !== PurchaseRequestStatusesEnum.InProcess && (
            <Button
              loading={isUpdateStatusPending}
              classNames={{ root: 'bg-black' }}
              onClick={() =>
                updatePurchaseRequestStatusMutation({
                  id: selectedPurchaseRequest?.id || 0,
                  status: PurchaseRequestStatusesEnum.InProcess,
                })
              }
            >
              Забронировать
            </Button>
          )}
          {selectedPurchaseRequest?.status !== PurchaseRequestStatusesEnum.Rejected && (
            <Button
              loading={isUpdateStatusPending}
              classNames={{ root: 'bg-black' }}
              onClick={() =>
                updatePurchaseRequestStatusMutation({
                  id: selectedPurchaseRequest?.id || 0,
                  status: PurchaseRequestStatusesEnum.Rejected,
                })
              }
            >
              Отклонить
            </Button>
          )}
          {selectedPurchaseRequest?.status !== PurchaseRequestStatusesEnum.Approved && (
            <Button
              loading={isUpdateStatusPending}
              classNames={{ root: 'bg-black' }}
              onClick={() =>
                updatePurchaseRequestStatusMutation({
                  id: selectedPurchaseRequest?.id || 0,
                  status: PurchaseRequestStatusesEnum.Approved,
                })
              }
            >
              Продано
            </Button>
          )}
        </Group>
      </Modal>

      <Modal
        opened={openedModalType === ModalTypes.Delete}
        centered
        onClose={() => setOpenedModalType(null)}
      >
        <h2 className="text-center text-xl mb-3">Удалить запрос?</h2>
        <p className="text-center mb-10 leading-tight">
          После удаления запроса нельзя будет изменить статус места через административную
          панель
        </p>
        <Group grow>
          <Button
            loading={isDeletePending}
            classNames={{ root: 'bg-black' }}
            onClick={handlePurchaseRequestDelete}
          >
            Удалить
          </Button>
          <Button
            variant="outline"
            loading={isDeletePending}
            classNames={{ root: 'border-black', label: 'text-black' }}
            onClick={() => setOpenedModalType(null)}
          >
            Закрыть
          </Button>
        </Group>
      </Modal>
    </>
  )
}
