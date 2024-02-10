import clsx from 'clsx'
import { useId } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { TControlledInput } from '../types/controlled-input.type'

interface IControlledTextInputProps<T extends FieldValues> extends TControlledInput<T> {
  label?: React.ReactNode
}

export default function ControlledTextInput<T extends FieldValues>(
  props: IControlledTextInputProps<T>
) {
  const { name, control, label, prefix, className, ...otherProps } = props

  const id = useId()
  const { field, fieldState } = useController({ name, control })

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id} className="block w-max mb-1 text-gray">
          {label}
        </label>
      ) : null}
      <div className="mb-2 flex gap-1 items-center">
        {prefix ? <p>{prefix}</p> : null}
        <input
          {...otherProps}
          {...field}
          id={id}
          className={clsx(
            'grow py-1 border-b border-black placeholder:text-gray focus:border-primary focus-visible:outline-none transition',
            fieldState.error && 'text-red focus:border-red'
          )}
        />
      </div>
      <div className="min-h-[1.25rem]">
        {fieldState.error?.message ? (
          <p className="text-xs text-red">{fieldState.error.message}</p>
        ) : null}
      </div>
    </div>
  )
}
