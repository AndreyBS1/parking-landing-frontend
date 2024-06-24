import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createPantryPurchaseRequest } from '../api/create-pantry-purchase-request'
import { createPurchaseRequest } from '../api/create-purschase-request'
import { queryClient } from '../api/query-client'
import Button from '../shared-ui/button.component'
import ControlledCheckbox from '../shared-ui/controlled-checkbox.component'
import ControlledTextInput from '../shared-ui/controlled-text-input.component'
import { PhoneNumberRegExp } from '../utils/reg-exps'
import { StringSchema } from '../utils/validation-schemas'

const schema = z.object({
  name: StringSchema.max(64, 'Слишком длинное имя'),
  phoneNumber: StringSchema.regex(
    PhoneNumberRegExp,
    'Пожалуйста, введите корректный номер телефона'
  ),
  email: StringSchema.email('Пожалуйста, введите корректный e-mail'),
  isAgreedWithTerms: z
    .boolean({
      required_error:
        'Пожалуйста, подтвердите, что согласны с условиями обработки данных',
      invalid_type_error:
        'Пожалуйста, подтвердите, что согласны с условиями обработки данных',
    })
    .refine(
      (value) => value || undefined,
      'Пожалуйста, подтвердите, что согласны с условиями обработки данных'
    ),
})

type TFormData = z.infer<typeof schema>

interface IPlaceBookingFormProps {
  placeId: number
  placeType: 'parking' | 'pantry'
  onSubmit: () => void
  onError: () => void
}

export default function PlaceBookingForm(props: IPlaceBookingFormProps) {
  const { placeId, placeType, onSubmit, onError } = props

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
    const bookingLimit = Number(localStorage.getItem('booking_limit') || 0)
    if (bookingLimit >= 10) {
      onError?.()
      return
    }
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
      localStorage.setItem('booking_limit', String(bookingLimit + 1))
      onSubmit()
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <ControlledTextInput
        control={control}
        name="name"
        label="Ваше имя"
        className="mb-4"
      />
      <ControlledTextInput
        control={control}
        name="phoneNumber"
        label="Ваш телефон"
        prefix="+7"
        className="mb-4"
      />
      <ControlledTextInput
        control={control}
        name="email"
        label="Ваш e-mail"
        className="mb-4"
      />
      <ControlledCheckbox
        control={control}
        name="isAgreedWithTerms"
        label="Нажимая кнопку “Отправить”, вы соглашаетесь с условиями обработки личных данных"
        className="mb-6"
      />
      <Button type="submit" className="w-full py-1">
        Отправить
      </Button>
    </form>
  )
}
