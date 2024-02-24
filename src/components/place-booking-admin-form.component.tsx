import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createPantryPurchaseRequest } from '../api/create-pantry-purchase-request'
import { createPurchaseRequest } from '../api/create-purschase-request'
import { queryClient } from '../api/query-client'
import { PhoneNumberRegExp } from '../utils/reg-exps'
import { StringSchema } from '../utils/validation-schemas'

const schema = z.object({
  name: StringSchema.max(64, 'Слишком длинное имя'),
  phoneNumber: StringSchema.regex(
    PhoneNumberRegExp,
    'Пожалуйста, введите корректный номер телефона'
  ),
  email: StringSchema.email('Пожалуйста, введите корректный e-mail'),
})

type TFormData = z.infer<typeof schema>

interface IPlaceBookingAdminFormProps {
  placeId: number
  placeType: 'parking' | 'pantry'
  onCancel: () => void
  onSubmit: () => void
  onError: () => void
}

export default function PlaceBookingAdminForm(props: IPlaceBookingAdminFormProps) {
  const { placeId, placeType, onCancel, onSubmit, onError } = props

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(schema),
  })
  const { mutateAsync: createPurchaseRequestMutation } = useMutation({
    mutationFn: createPurchaseRequest,
  })
  const { mutateAsync: createPantryPurchaseRequestMutation } = useMutation({
    mutationFn: createPantryPurchaseRequest,
  })

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
      if (placeType === 'parking') {
        await createPurchaseRequestMutation({
          parkingPlaceId: placeId,
          customerName: data.name,
          customerEmail: data.email,
          customerPhoneNumber: `+7${data.phoneNumber}`,
        })
        queryClient.invalidateQueries({ queryKey: ['parking-places'] })
      }
      if (placeType === 'pantry') {
        await createPantryPurchaseRequestMutation({
          pantryPlaceId: placeId,
          customerName: data.name,
          customerEmail: data.email,
          customerPhoneNumber: `+7${data.phoneNumber}`,
        })
        queryClient.invalidateQueries({ queryKey: ['pantry-places'] })
      }
      onSubmit()
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack gap="md" mb="xl">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Имя"
              error={error?.message}
              onChange={(event) => field.onChange(event)}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Почта"
              error={error?.message}
              onChange={(event) => field.onChange(event)}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Номер"
              error={error?.message}
              leftSection={<p>+7</p>}
              onChange={(event) => field.onChange(event)}
            />
          )}
        />
      </Stack>
      <Group grow>
        <Button
          type="button"
          variant="outline"
          classNames={{ root: 'border-black', label: 'text-black' }}
          onClick={onCancel}
        >
          Закрыть
        </Button>
        <Button type="submit" classNames={{ root: 'bg-black' }}>
          Забронировать
        </Button>
      </Group>
    </form>
  )
}
