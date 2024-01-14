import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, Select, Stack, TextInput } from '@mantine/core'
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
  placeType: StringSchema,
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
    defaultValues: { placeType: String(parkingPlace.type) },
  })
  const { mutateAsync: updateParkingPlaceMutation } = useMutation({
    mutationFn: updateParkingPlace,
  })

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
      await updateParkingPlaceMutation({
        ...parkingPlace,
        type: Number(data.placeType),
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
        <TextInput
          label="Площадь"
          value={parkingPlace.area}
          readOnly
          rightSection={<p>м2</p>}
        />
        <TextInput
          label="Старая цена"
          value={parkingPlace.previousPrice || 'Не указана'}
          readOnly
          rightSection={<p>₽</p>}
        />
        <TextInput
          label="Текущая цена"
          value={parkingPlace.currentPrice}
          readOnly
          rightSection={<p>₽</p>}
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
