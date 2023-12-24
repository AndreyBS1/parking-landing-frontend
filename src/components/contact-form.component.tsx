import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCallRequest } from '../api/create-call-request'
import { queryClient } from '../api/query-client'
import Button from '../shared-ui/button.component'
import ControlledCheckbox from '../shared-ui/controlled-checkbox.component'
import ControlledTextInput from '../shared-ui/controlled-text-input.component'

const PhoneNumberRegExp = /^((\+7)|8)[0-9]{10}$/

const StringSchema = z
  .string({
    required_error: 'Пожалуйста, заполните это поле',
    invalid_type_error: 'Пожалуйста, введите корректные символы',
  })
  .trim()
  .min(1, 'Пожалуйста, заполните это поле')

const schema = z.object({
  name: StringSchema.max(64, 'Слишком длинное имя'),
  phoneNumber: StringSchema.regex(
    PhoneNumberRegExp,
    'Пожалуйста, введите корректный номер телефона'
  ),
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

interface IContactFormProps {
  onSubmit: () => void
  onError: () => void
}

export default function ContactForm(props: IContactFormProps) {
  const { onSubmit, onError } = props

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phoneNumber: '' },
  })
  const { mutateAsync: createCallRequestMutation } = useMutation({
    mutationFn: createCallRequest,
  })

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
      await createCallRequestMutation({
        customerName: data.name,
        customerPhoneNumber: data.phoneNumber,
      })
      queryClient.invalidateQueries({ queryKey: ['parking-places'] })
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
        className="mb-4"
      />
      <ControlledCheckbox
        control={control}
        name="isAgreedWithTerms"
        label="Нажимая кнопку “Отправить”, вы соглашаетесь с условиями обработки личных данных"
        className="mb-6"
      />
      <Button type="submit" className="w-full py-1">
        Заказать звонок
      </Button>
    </form>
  )
}
