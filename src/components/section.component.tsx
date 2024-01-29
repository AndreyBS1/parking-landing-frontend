import clsx from 'clsx'

type TSectionProps = React.ComponentPropsWithoutRef<'section'>

export default function Section(props: TSectionProps) {
  const { className, children, ...otherProps } = props

  return (
    <section className={clsx('min-h-screen', className)} {...otherProps}>
      {children}
    </section>
  )
}
