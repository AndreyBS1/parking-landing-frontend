import { z } from 'zod'

export const StringSchema = z
  .string({
    required_error: 'Пожалуйста, заполните это поле',
    invalid_type_error: 'Пожалуйста, введите корректные символы',
  })
  .trim()
  .min(1, 'Пожалуйста, заполните это поле')
