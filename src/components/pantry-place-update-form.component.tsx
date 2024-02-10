import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { queryClient } from '../api/query-client'
import { updatePantryPlace } from '../api/update-pantry-place'
import { IPantryPlace } from '../types/pantry-place.type'
import { StringSchema } from '../utils/validation-schemas'

const schema = z.object({
  previousPrice: StringSchema,
  currentPrice: StringSchema,
  placeType: StringSchema,
})

type TFormData = z.infer<typeof schema>

interface IPantryPlaceUpdateFormProps {
  pantryPlace: IPantryPlace
  onSubmit: () => void
  onCancel: () => void
}

export default function PantryPlaceUpdateForm(props: IPantryPlaceUpdateFormProps) {
  const { pantryPlace, onSubmit, onCancel } = props

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      previousPrice: String(pantryPlace.previousPrice),
      currentPrice: String(pantryPlace.currentPrice),
    },
  })
  const { mutateAsync: updatePantryPlaceMutation } = useMutation({
    mutationFn: updatePantryPlace,
  })

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
      await updatePantryPlaceMutation({
        ...pantryPlace,
        previousPrice: Number(data.previousPrice),
        currentPrice: Number(data.currentPrice),
      })
      queryClient.invalidateQueries({ queryKey: ['pantry-places'] })
      onSubmit()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack gap="md" mb="xl">
        <TextInput
          label="Площадь"
          value={pantryPlace.area}
          readOnly
          rightSection={<p>м2</p>}
        />
        <Controller
          control={control}
          name="previousPrice"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              {...field}
              label="Старая цена"
              error={error?.message}
              rightSection={<p>₽</p>}
              onChange={(value) => field.onChange(String(value))}
            />
          )}
        />
        <Controller
          control={control}
          name="currentPrice"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              {...field}
              label="Текущая цена"
              error={error?.message}
              rightSection={<p>₽</p>}
              onChange={(value) => field.onChange(String(value))}
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
          Обновить
        </Button>
      </Group>
    </form>
  )
}
