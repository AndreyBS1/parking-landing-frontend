import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, Stack, TextInput, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createNewsPost } from '../api/create-news-post'
import { queryClient } from '../api/query-client'
import { uploadNewsPostImage } from '../api/upload-news-post-image'
import { StringSchema } from '../utils/validation-schemas'

const schema = z.object({
  title: StringSchema,
  description: StringSchema.max(255, 'Слишком длинное описание'),
  createdAt: StringSchema,
})

type TFormData = z.infer<typeof schema>

interface INewsPostCreateFormProps {
  onSubmit: () => void
  onCancel: () => void
}

export default function NewsPostCreateForm(props: INewsPostCreateFormProps) {
  const { onSubmit, onCancel } = props

  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const imageSrc = uploadedImage ? URL.createObjectURL(uploadedImage) : null

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      createdAt: new Date().toISOString(),
    },
  })

  const { mutateAsync: createNewsPostMutation, isPending: isCreatePostPending } =
    useMutation({
      mutationFn: createNewsPost,
    })

  const { mutateAsync: uploadNewsPostImageMutation, isPending: isUploadImagePending } =
    useMutation({
      mutationFn: uploadNewsPostImage,
    })

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files
    if (!filesList || filesList.length === 0) {
      return
    }
    const file = filesList.item(0)
    if (!file) {
      return
    }
    setUploadedImage(file)
  }

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    if (!uploadedImage) {
      return
    }
    try {
      const { id } = await createNewsPostMutation({ ...data, imagePath: null })
      await uploadNewsPostImageMutation({ blogId: id, file: uploadedImage })
      queryClient.invalidateQueries({ queryKey: ['news'] })
      onSubmit()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack gap="md" mb="xl">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Заголовок"
              error={error?.message}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="createdAt"
          render={({ field, fieldState: { error } }) => (
            <DateInput
              {...field}
              label="Дата"
              value={field.value ? new Date(field.value) : null}
              valueFormat="DD.MM.YYYY"
              error={error?.message}
              onChange={(value) => field.onChange(value?.toISOString() ?? '')}
            />
          )}
        />
        {imageSrc ? (
          <button
            type="button"
            className="block w-3/5 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={imageSrc}
              alt=""
              className="aspect-video w-full rounded-md object-cover object-center"
            />
          </button>
        ) : (
          <button
            type="button"
            className="w-3/5 aspect-video bg-gray rounded-md flex justify-center items-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-2xl text-white">+</p>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              {...field}
              label="Описание"
              rows={4}
              error={error?.message}
              onChange={field.onChange}
            />
          )}
        />
      </Stack>
      <Group grow>
        <Button
          type="button"
          variant="outline"
          loading={isCreatePostPending || isUploadImagePending}
          classNames={{ root: 'border-black', label: 'text-black' }}
          onClick={onCancel}
        >
          Закрыть
        </Button>
        <Button
          type="submit"
          loading={isCreatePostPending || isUploadImagePending}
          classNames={{ root: 'bg-black' }}
        >
          Создать
        </Button>
      </Group>
    </form>
  )
}
