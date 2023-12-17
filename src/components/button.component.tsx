import clsx from 'clsx'

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export default function MButton(props: IButtonProps) {
  const { children, className, ...otherProps } = props

  return (
    <button
      className={clsx(
        'rounded-full border-2 text-white bg-primary border-primary hover:text-primary hover:bg-white active:text-primary-accent active:border-primary-accent transition-colors',
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}
