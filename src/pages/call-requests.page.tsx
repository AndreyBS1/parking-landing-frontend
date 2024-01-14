import { Button, Loader, Pill, Table } from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { closeCallRequest } from '../api/close-call-request'
import { getCallRequests } from '../api/get-call-requests'
import { queryClient } from '../api/query-client'
import { CallRequestStatusRecord } from '../constants/call-request-status-record'
import { CallRequestStatusesEnum } from '../enums/call-request-statuses.enum'

export default function CallRequestsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['call-requests'],
    queryFn: getCallRequests,
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

  return (
    <Table striped={data.length > 0} highlightOnHover={data.length > 0}>
      <Table.Thead>
        <Table.Th>Дата</Table.Th>
        <Table.Th>Имя</Table.Th>
        <Table.Th>Телефон</Table.Th>
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
        {data.map((callRequest) => (
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
  )
}
