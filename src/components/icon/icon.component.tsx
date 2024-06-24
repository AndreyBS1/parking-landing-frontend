import { Suspense, lazy, useMemo } from 'react'

const IconTypes = {
  'pantry-1': lazy(() => import('./assets/pantry-1.svg?react')),
  'pantry-2': lazy(() => import('./assets/pantry-2.svg?react')),
  'pantry-3': lazy(() => import('./assets/pantry-3.svg?react')),
  'pantry-4': lazy(() => import('./assets/pantry-4.svg?react')),
  'pantry-5': lazy(() => import('./assets/pantry-5.svg?react')),
  'pantry-6': lazy(() => import('./assets/pantry-6.svg?react')),
  'pantry-7': lazy(() => import('./assets/pantry-7.svg?react')),
  'pantry-8': lazy(() => import('./assets/pantry-8.svg?react')),
  'pantry-9': lazy(() => import('./assets/pantry-9.svg?react')),
  'pantry-10': lazy(() => import('./assets/pantry-10.svg?react')),
  'pantry-11': lazy(() => import('./assets/pantry-11.svg?react')),
  'pantry-12': lazy(() => import('./assets/pantry-12.svg?react')),
  'pantry-13': lazy(() => import('./assets/pantry-13.svg?react')),
  'pantry-14': lazy(() => import('./assets/pantry-14.svg?react')),
  'pantry-15': lazy(() => import('./assets/pantry-15.svg?react')),
  'pantry-16': lazy(() => import('./assets/pantry-16.svg?react')),
  'pantry-17': lazy(() => import('./assets/pantry-17.svg?react')),
  'pantry-18': lazy(() => import('./assets/pantry-18.svg?react')),
  'pantry-19': lazy(() => import('./assets/pantry-19.svg?react')),
  'pantry-20': lazy(() => import('./assets/pantry-20.svg?react')),
  'pantry-21': lazy(() => import('./assets/pantry-21.svg?react')),
  'pantry-22': lazy(() => import('./assets/pantry-22.svg?react')),
  'pantry-23': lazy(() => import('./assets/pantry-23.svg?react')),
  'pantry-24': lazy(() => import('./assets/pantry-24.svg?react')),
  'pantry-25': lazy(() => import('./assets/pantry-25.svg?react')),
  'pantry-26': lazy(() => import('./assets/pantry-26.svg?react')),
  'pantry-27': lazy(() => import('./assets/pantry-27.svg?react')),
  'pantry-28': lazy(() => import('./assets/pantry-28.svg?react')),
  'pantry-29': lazy(() => import('./assets/pantry-29.svg?react')),
  'pantry-30': lazy(() => import('./assets/pantry-30.svg?react')),
  'pantry-31': lazy(() => import('./assets/pantry-31.svg?react')),
  'pantry-32': lazy(() => import('./assets/pantry-32.svg?react')),
  'pantry-33': lazy(() => import('./assets/pantry-33.svg?react')),
  'pantry-34': lazy(() => import('./assets/pantry-34.svg?react')),
  'pantry-35': lazy(() => import('./assets/pantry-35.svg?react')),
  'pantry-36': lazy(() => import('./assets/pantry-36.svg?react')),
  'pantry-37': lazy(() => import('./assets/pantry-37.svg?react')),
  'pantry-38': lazy(() => import('./assets/pantry-38.svg?react')),
  'pantry-39': lazy(() => import('./assets/pantry-39.svg?react')),
  'pantry-40': lazy(() => import('./assets/pantry-40.svg?react')),
  'pantry-41': lazy(() => import('./assets/pantry-41.svg?react')),
  'pantry-42': lazy(() => import('./assets/pantry-42.svg?react')),
  'pantry-43': lazy(() => import('./assets/pantry-43.svg?react')),
  'pantry-44': lazy(() => import('./assets/pantry-44.svg?react')),
  'pantry-45': lazy(() => import('./assets/pantry-45.svg?react')),
  'pantry-46': lazy(() => import('./assets/pantry-46.svg?react')),
  'pantry-47': lazy(() => import('./assets/pantry-47.svg?react')),
  'pantry-48': lazy(() => import('./assets/pantry-48.svg?react')),
  'pantry-49': lazy(() => import('./assets/pantry-49.svg?react')),
  'pantry-50': lazy(() => import('./assets/pantry-50.svg?react')),
  'pantry-51': lazy(() => import('./assets/pantry-51.svg?react')),
  'pantry-52': lazy(() => import('./assets/pantry-52.svg?react')),
  'pantry-53': lazy(() => import('./assets/pantry-53.svg?react')),
  'pantry-54': lazy(() => import('./assets/pantry-54.svg?react')),
  'pantry-55': lazy(() => import('./assets/pantry-55.svg?react')),
  'pantry-56': lazy(() => import('./assets/pantry-56.svg?react')),
  'pantry-57': lazy(() => import('./assets/pantry-57.svg?react')),
  'pantry-58': lazy(() => import('./assets/pantry-58.svg?react')),
  'pantry-59': lazy(() => import('./assets/pantry-59.svg?react')),
  'pantry-60': lazy(() => import('./assets/pantry-60.svg?react')),
  'pantry-61': lazy(() => import('./assets/pantry-61.svg?react')),
  'pantry-62': lazy(() => import('./assets/pantry-62.svg?react')),
  'pantry-63': lazy(() => import('./assets/pantry-63.svg?react')),
  'pantry-64': lazy(() => import('./assets/pantry-64.svg?react')),
  'pantry-65': lazy(() => import('./assets/pantry-65.svg?react')),
  'pantry-66': lazy(() => import('./assets/pantry-66.svg?react')),
  'pantry-67': lazy(() => import('./assets/pantry-67.svg?react')),
  'pantry-68': lazy(() => import('./assets/pantry-68.svg?react')),
  'pantry-69': lazy(() => import('./assets/pantry-69.svg?react')),
  'pantry-70': lazy(() => import('./assets/pantry-70.svg?react')),
  'pantry-71': lazy(() => import('./assets/pantry-71.svg?react')),
  'pantry-72': lazy(() => import('./assets/pantry-72.svg?react')),
  'pantry-73': lazy(() => import('./assets/pantry-73.svg?react')),
  'pantry-74': lazy(() => import('./assets/pantry-74.svg?react')),
  'pantry-75': lazy(() => import('./assets/pantry-75.svg?react')),
  'pantry-76': lazy(() => import('./assets/pantry-76.svg?react')),
  'pantry-77': lazy(() => import('./assets/pantry-77.svg?react')),
  'pantry-78': lazy(() => import('./assets/pantry-78.svg?react')),
  'pantry-79': lazy(() => import('./assets/pantry-79.svg?react')),
  'pantry-80': lazy(() => import('./assets/pantry-80.svg?react')),
  'pantry-81': lazy(() => import('./assets/pantry-81.svg?react')),
  'pantry-82': lazy(() => import('./assets/pantry-82.svg?react')),
  'pantry-83': lazy(() => import('./assets/pantry-83.svg?react')),
  'pantry-84': lazy(() => import('./assets/pantry-84.svg?react')),
  'pantry-85': lazy(() => import('./assets/pantry-85.svg?react')),
  'pantry-86': lazy(() => import('./assets/pantry-86.svg?react')),
  'pantry-87': lazy(() => import('./assets/pantry-87.svg?react')),
  'pantry-88': lazy(() => import('./assets/pantry-88.svg?react')),
  'pantry-89': lazy(() => import('./assets/pantry-89.svg?react')),
  'pantry-90': lazy(() => import('./assets/pantry-90.svg?react')),
  'pantry-91': lazy(() => import('./assets/pantry-91.svg?react')),
  'pantry-92': lazy(() => import('./assets/pantry-92.svg?react')),
  'pantry-93': lazy(() => import('./assets/pantry-93.svg?react')),
  'pantry-94': lazy(() => import('./assets/pantry-94.svg?react')),
} as const

export type TIconTypes = keyof typeof IconTypes

export type IIconProps = React.SVGAttributes<SVGElement> & {
  name: TIconTypes
}

export function Icon(props: IIconProps) {
  const { name, ...otherProps } = props

  const IconComponent = useMemo(
    () => IconTypes[name] as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    [name]
  )

  if (!IconComponent) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <IconComponent role="img" {...otherProps} />
    </Suspense>
  )
}
