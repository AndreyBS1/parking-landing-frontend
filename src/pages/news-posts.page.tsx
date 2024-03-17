import { Button, Group, Loader, Modal, Select, Table, TextInput } from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteNewsPost } from '../api/delete-news-post'
import { getNewsPosts } from '../api/get-news-posts'
import { queryClient } from '../api/query-client'
import NewsPostCreateForm from '../components/news-post-create-form.component'
import NewsPostUpdateForm from '../components/news-post-update-form.component'
import { INewsPost } from '../types/news-post.type'

enum ModalTypes {
  Create,
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

type TFilterOptions = {
  date: string | null
  title: string | null
}

export default function NewsPostsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: getNewsPosts,
  })

  const { mutate: deleteNewsPostMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deleteNewsPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      setOpenedModalType(null)
    },
  })

  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    date: String(DateFilterTypeEnum.NewFirst),
    title: null,
  })

  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)

  const [selectedNewsPost, setSelectedNewsPost] = useState<INewsPost | null>(null)

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

  const filteredData = data.filter((post) => {
    let isPurchaseRequestValid = true
    const { title } = filterOptions
    if (title && !post.title.toLowerCase().includes(title.toLowerCase())) {
      isPurchaseRequestValid = false
    }
    return isPurchaseRequestValid
  })

  filteredData.sort((postA, postB) => {
    const createdTimestampA = new Date(postA.createdAt).getTime()
    const createdTimestampB = new Date(postB.createdAt).getTime()
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

  const handleShowMoreButtonClick = (post: INewsPost) => {
    setSelectedNewsPost(post)
    setOpenedModalType(ModalTypes.Update)
  }

  const handleDeleteButtonClick = (post: INewsPost) => {
    setSelectedNewsPost(post)
    setOpenedModalType(ModalTypes.Delete)
  }

  const handleDelete = () => {
    if (!selectedNewsPost) {
      return
    }
    deleteNewsPostMutation(selectedNewsPost.id)
  }

  return (
    <>
      <Group justify="space-between">
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
          <TextInput
            label="Заголовок"
            placeholder="Введите заголовок"
            value={filterOptions.title ?? ''}
            onChange={(event) =>
              handleFilterOptionChange('title', event.target.value ?? null)
            }
          />
        </Group>
        <div className="w-80 px-2">
          <Button
            classNames={{ root: 'bg-black' }}
            onClick={() => setOpenedModalType(ModalTypes.Create)}
          >
            Создать
          </Button>
        </div>
      </Group>
      <Table striped={filteredData.length > 0} highlightOnHover={filteredData.length > 0}>
        <Table.Thead>
          <Table.Th>Дата</Table.Th>
          <Table.Th>Заголовок</Table.Th>
          <Table.Th></Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {filteredData.length === 0 && (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <div className="h-96 flex justify-center items-center">
                  <p className="text-2xl font-semibold opacity-30">Новости не найдены</p>
                </div>
              </Table.Td>
            </Table.Tr>
          )}
          {filteredData.map((post) => (
            <Table.Tr key={post.id}>
              <Table.Td>{new Date(post.createdAt).toLocaleDateString('ru')}</Table.Td>
              <Table.Td>{post.title}</Table.Td>
              <Table.Td w="20rem">
                <Group>
                  <Button
                    classNames={{ root: 'bg-black' }}
                    onClick={() => handleShowMoreButtonClick(post)}
                  >
                    Обновить
                  </Button>
                  <Button
                    classNames={{ root: 'bg-red' }}
                    onClick={() => handleDeleteButtonClick(post)}
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
        opened={openedModalType === ModalTypes.Create}
        title="Создать новость"
        centered
        size="xl"
        classNames={{ title: 'text-xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <NewsPostCreateForm
          onSubmit={() => setOpenedModalType(null)}
          onCancel={() => setOpenedModalType(null)}
        />
      </Modal>

      <Modal
        opened={openedModalType === ModalTypes.Update}
        title={selectedNewsPost?.title}
        centered
        size="xl"
        classNames={{ title: 'text-xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        {selectedNewsPost && (
          <NewsPostUpdateForm
            newsPost={selectedNewsPost}
            onSubmit={() => setOpenedModalType(null)}
            onCancel={() => setOpenedModalType(null)}
          />
        )}
      </Modal>

      <Modal
        opened={openedModalType === ModalTypes.Delete}
        title="Удалить новость?"
        centered
        size="lg"
        classNames={{ title: 'text-xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <p className="mb-6 leading-tight">
          После удаления новости "{selectedNewsPost?.title}" от{' '}
          {new Date(selectedNewsPost?.createdAt ?? '').toLocaleDateString('ru')}, ее
          нельзя будет восстановить. Вы уверены?
        </p>
        <Group grow>
          <Button
            loading={isDeletePending}
            classNames={{ root: 'bg-black' }}
            onClick={handleDelete}
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
