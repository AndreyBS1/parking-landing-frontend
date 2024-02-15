import { zodResolver } from '@hookform/resolvers/zod'
import { Button, NumberInput, Stack } from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getParkingPlaces } from '../api/get-parking-places'
import { queryClient } from '../api/query-client'
import { updateParkingPlace } from '../api/update-parking-place'
import { StringSchema } from '../utils/validation-schemas'

const schema = z.object({
  area: StringSchema,
  previousPrice: StringSchema,
  currentPrice: StringSchema,
})

type TFormData = z.infer<typeof schema>

interface IUpdatePlacesFormProps {
  placeType: string
  floor?: string
  defaultValues?: Partial<TFormData>
  onSubmit: () => void
  onError: () => void
}

export default function UpdatePlacesForm(props: IUpdatePlacesFormProps) {
  const { placeType, floor, defaultValues, onSubmit, onError } = props

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    data: parkingPlaces,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['parking-places'],
    queryFn: getParkingPlaces,
  })

  const { mutateAsync: updateParkingPlaceMutation, isPending } = useMutation({
    mutationFn: updateParkingPlace,
  })

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    if (!parkingPlaces) {
      return
    }
    try {
      const placesToUpdate = parkingPlaces.filter((parkingPlace) => {
        let isParkingPlaceValid = true
        if (parkingPlace.type !== Number(placeType)) {
          isParkingPlaceValid = false
        }
        if (floor && parkingPlace.floor !== Number(floor)) {
          isParkingPlaceValid = false
        }
        return isParkingPlaceValid
      })
      const promises = placesToUpdate.map((place) =>
        updateParkingPlaceMutation({
          ...place,
          area: Number(data.area),
          previousPrice: Number(data.previousPrice),
          currentPrice: Number(data.currentPrice),
        })
      )
      await Promise.all(promises)
      queryClient.invalidateQueries({ queryKey: ['parking-places'] })
      onSubmit()
    } catch (error) {
      console.error(error)
      onError()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack w="30rem" gap="md" mb="xl">
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
      </Stack>
      <Button
        type="submit"
        loading={isPending || isLoading || isError}
        classNames={{ root: 'bg-black' }}
      >
        Сохранить
      </Button>
    </form>
  )
}
