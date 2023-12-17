import clsx from 'clsx'

interface ILinkProps extends React.ComponentPropsWithoutRef<'a'> {}

export default function Link(props: ILinkProps) {
  const { className, children, ...otherProps } = props

  return (
    <a
      className={clsx(
        'uppercase hover:underline underline-offset-2 focus:text-primary transition-colors',
        className
      )}
      {...otherProps}
    >
      {children}
    </a>
  )
}
