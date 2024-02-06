import {
  Button,
  Group,
  Loader,
  Modal,
  Pill,
  Stack,
  Table,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPantryPurchaseRequests } from '../api/get-pantry-purchase-requests'
import { queryClient } from '../api/query-client'
import { updatePantryPurchaseRequestStatus } from '../api/update-pantry-purchase-request-status'
import { PurchaseRequestStatusRecord } from '../constants/purchase-request-status-record.constant'
import { PurchaseRequestStatusesEnum } from '../enums/purchase-request-statuses.enum'
import { IPantryPurchaseRequest } from '../types/pantry-purchase-request.type'

export default function PantryPurchaseRequestsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pantry-purchase-requests'],
    queryFn: getPantryPurchaseRequests,
  })
  const [isModalOpened, { open: openModal, close: closeModal }] = useDisclosure()
  const {
    mutate: updatePurchaseRequestStatusMutation,
    isPending: isUpdateStatusPending,
  } = useMutation({
    mutationFn: updatePantryPurchaseRequestStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-requests'] })
      closeModal()
    },
  })

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

  const handleShowMoreButtonClick = (purchaseRequest: IPantryPurchaseRequest) => {
    setSelectedPurchaseRequest(purchaseRequest)
    openModal()
  }

  return (
    <>
      <Table striped={data.length > 0} highlightOnHover={data.length > 0}>
        <Table.Thead>
          <Table.Th>Дата</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Телефон</Table.Th>
          <Table.Th>Почта</Table.Th>
          <Table.Th>Статус</Table.Th>
          <Table.Th></Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {data.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <div className="h-96 flex justify-center items-center">
                  <p className="text-2xl font-semibold opacity-30">Заявки не найдены</p>
                </div>
              </Table.Td>
            </Table.Tr>
          )}
          {data.map((purchaseRequest) => (
            <Table.Tr key={purchaseRequest.id}>
              <Table.Td>
                {new Date(purchaseRequest.createdAt).toLocaleDateString('ru')}
              </Table.Td>
              <Table.Td>{purchaseRequest.customerName}</Table.Td>
              <Table.Td>{purchaseRequest.customerPhoneNumber}</Table.Td>
              <Table.Td>{purchaseRequest.customerEmail}</Table.Td>
              <Table.Td>
                <Pill color={PurchaseRequestStatusRecord[purchaseRequest.status].color}>
                  {PurchaseRequestStatusRecord[purchaseRequest.status].title}
                </Pill>
              </Table.Td>
              <Table.Td>
                <Button
                  classNames={{ root: 'bg-black' }}
                  onClick={() => handleShowMoreButtonClick(purchaseRequest)}
                >
                  Подробнее
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={isModalOpened}
        title={`Запрос на покупку места №${selectedPurchaseRequest?.pantryPlace.id}`}
        centered
        size="lg"
        classNames={{ title: 'text-xl' }}
        onClose={closeModal}
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
            onClick={closeModal}
          >
            Закрыть
          </Button>
          {selectedPurchaseRequest?.status !== PurchaseRequestStatusesEnum.Idle && (
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
              Одобрить
            </Button>
          )}
        </Group>
      </Modal>
    </>
  )
}
