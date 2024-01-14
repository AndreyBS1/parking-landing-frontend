import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, PasswordInput, TextInput } from '@mantine/core'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { signIn } from '../api/sign-in'
import { useAuthStore } from '../stores/use-auth-store.hook'
import { StringSchema } from '../utils/validation-schemas'

const schema = z.object({
  username: StringSchema,
  password: StringSchema,
})

type TFormData = z.infer<typeof schema>

export default function AuthPage() {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((store) => store.setAccessToken)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
  })

  const [isPending, setIsPending] = useState(false)

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    setIsPending(true)
    try {
      const { accessToken } = await signIn(data)
      sessionStorage.setItem('access_token', accessToken)
      setAccessToken(accessToken)
      navigate('/admin/dashboard/parking-places')
    } catch (error) {
      console.error(error)
      setError('root', { message: 'Неверный логин и/или пароль' })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Container h="100vh" className="flex flex-col justify-center items-center">
      <h1 className="mb-12 text-2xl">Административная панель</h1>
      <form className="w-96" onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label="Имя пользователя"
              error={error?.message}
              className="mb-6"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <PasswordInput
              label="Пароль"
              error={error?.message}
              className="mb-6"
              {...field}
            />
          )}
        />
        <div className="h-5 mb-5">
          {errors?.root?.message && (
            <p className="text-xs text-red">{errors.root.message}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="filled"
          fullWidth
          loading={isPending}
          classNames={{ root: 'bg-black' }}
        >
          Войти
        </Button>
      </form>
    </Container>
  )
}
