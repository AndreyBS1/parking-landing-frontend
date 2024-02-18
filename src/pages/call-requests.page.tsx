import { Button, Group, Loader, Pill, Select, Table } from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { closeCallRequest } from '../api/close-call-request'
import { getCallRequests } from '../api/get-call-requests'
import { queryClient } from '../api/query-client'
import { CallRequestStatusRecord } from '../constants/call-request-status-record'
import { CallRequestStatusesEnum } from '../enums/call-request-statuses.enum'

const statusFilterData = [
  { label: 'В ожидании', value: String(CallRequestStatusesEnum.Idle) },
  { label: 'Обработана', value: String(CallRequestStatusesEnum.Closed) },
]

type TFilterOptions = {
  status: string | null
}

export default function CallRequestsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['call-requests'],
    queryFn: getCallRequests,
  })

  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    status: null,
  })

  const { mutate: closeCallRequestMutation } = useMutation({
    mutationFn: closeCallRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['call-requests'] })
    },
  })

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
    const { status } = filterOptions
    if (status && purchaseRequest.status !== Number(status)) {
      isPurchaseRequestValid = false
    }
    return isPurchaseRequestValid
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

  return (
    <>
      <Group mb="xl">
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
          {filteredData.map((callRequest) => (
            <Table.Tr key={callRequest.id}>
              <Table.Td>
                {new Date(callRequest.createdAt).toLocaleDateString('ru')}
              </Table.Td>
              <Table.Td>{callRequest.customerName}</Table.Td>
              <Table.Td>{callRequest.customerPhoneNumber}</Table.Td>
              <Table.Td>
                <Pill color={CallRequestStatusRecord[callRequest.status].color}>
                  {CallRequestStatusRecord[callRequest.status].title}
                </Pill>
              </Table.Td>
              <Table.Td>
                {callRequest.status === CallRequestStatusesEnum.Idle && (
                  <Button
                    classNames={{ root: 'bg-black' }}
                    onClick={() => closeCallRequestMutation(callRequest.id)}
                  >
                    Закрыть заявку
                  </Button>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}
