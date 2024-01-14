import { zodResolver } from '@hookform/resolvers/zod'
import { NumberInput, Stack } from '@mantine/core'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { queryClient } from '../api/query-client'
import { StringSchema } from '../utils/validation-schemas'

const schema = z.object({
  placeType: StringSchema,
})

type TFormData = z.infer<typeof schema>

interface IUpdatePricesFormProps {
  onSubmit: () => void
  onError: () => void
}

export default function UpdatePricesForm(props: IUpdatePricesFormProps) {
  const { onSubmit, onError } = props

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(schema),
  })
  // const { mutateAsync: updateParkingPlaceMutation } = useMutation({
  //   mutationFn: updateParkingPlace,
  // })

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
      console.log('data:', data)
      queryClient.invalidateQueries({ queryKey: ['parking-places'] })
      onSubmit()
    } catch (error) {
      console.error(error)
      onError()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack gap="md" mb="xl">
        <Controller
          control={control}
          name="placeType"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              {...field}
              label="Старая цена"
              error={error?.message}
              rightSection={<p>₽</p>}
            />
          )}
        />
        <Controller
          control={control}
          name="placeType"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              {...field}
              label="Текущая цена"
              error={error?.message}
              rightSection={<p>₽</p>}
            />
          )}
        />
      </Stack>
    </form>
  )
}
