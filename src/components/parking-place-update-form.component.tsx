import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, NumberInput, Select, Stack } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { queryClient } from '../api/query-client'
import { updateParkingPlace } from '../api/update-parking-place'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'
import { IParkingPlace } from '../types/parking-place.type'
import { StringSchema } from '../utils/validation-schemas'

const placeTypeData = [
  { label: 'Cтандарт', value: String(ParkingPlaceTypesEnum.Standard) },
  { label: 'Комфорт', value: String(ParkingPlaceTypesEnum.Comfort) },
  { label: 'Премиум', value: String(ParkingPlaceTypesEnum.Premium) },
]

const schema = z.object({
  previousPrice: StringSchema,
  currentPrice: StringSchema,
  placeType: StringSchema,
  area: StringSchema,
})

type TFormData = z.infer<typeof schema>

interface IParkingPlaceUpdateFormProps {
  parkingPlace: IParkingPlace
  onSubmit: () => void
  onCancel: () => void
}

export default function ParkingPlaceUpdateForm(props: IParkingPlaceUpdateFormProps) {
  const { parkingPlace, onSubmit, onCancel } = props

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      previousPrice: String(parkingPlace.previousPrice),
      currentPrice: String(parkingPlace.currentPrice),
      placeType: String(parkingPlace.type),
      area: String(parkingPlace.area),
    },
  })
  const { mutateAsync: updateParkingPlaceMutation } = useMutation({
    mutationFn: updateParkingPlace,
  })

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
      await updateParkingPlaceMutation({
        ...parkingPlace,
        type: Number(data.placeType),
        area: Number(data.area),
        previousPrice: Number(data.previousPrice),
        currentPrice: Number(data.currentPrice),
      })
      queryClient.invalidateQueries({ queryKey: ['parking-places'] })
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
          name="area"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              {...field}
              label="Площадь"
              error={error?.message}
              rightSection={<p>м2</p>}
              onChange={(value) => field.onChange(String(value))}
            />
          )}
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
        <Controller
          control={control}
          name="placeType"
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              label="Тип места"
              data={placeTypeData}
              error={error?.message}
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
