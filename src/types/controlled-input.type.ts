import { Control, FieldValues, Path } from 'react-hook-form'

export type TControlledInput<T extends FieldValues> =
  React.ComponentPropsWithoutRef<'input'> & {
    name: Path<T>
    control: Control<T>
  }
