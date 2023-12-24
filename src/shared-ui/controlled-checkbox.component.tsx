import { Checkbox } from '@mantine/core'
import { FieldValues, useController } from 'react-hook-form'
import { TControlledInput } from '../types/controlled-input.type'

interface IControlledCheckboxProps<T extends FieldValues>
  extends Omit<TControlledInput<T>, 'size'> {
  label: React.ReactNode
}

export default function ControlledCheckbox<T extends FieldValues>(
  props: IControlledCheckboxProps<T>
) {
  const { name, control, ...otherProps } = props

  const { field, fieldState } = useController({ name, control })

  return (
    <Checkbox
      color="#F9B004"
      {...otherProps}
      {...field}
      error={fieldState.error?.message}
    />
  )
}
