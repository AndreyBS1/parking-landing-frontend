interface ILink {
  title: string
  selector: string
}

export const Links: ILink[] = [
  { title: 'ПЛАН ПАРКИНГА', selector: '#parking-plan' },
  { title: 'ФОТОГАЛЕРЕЯ', selector: '#photo-gallery' },
  { title: 'КОНТАКТЫ', selector: '#contacts' },
]

export const AdminLinks = [
  { title: 'Цены', href: '/admin/dashboard/prices' },
  { title: 'Парковочные места', href: '/admin/dashboard/parking-places' },
  { title: 'Кладовые места', href: '/admin/dashboard/pantry-places' },
  { title: 'Заявки на покупку', href: '/admin/dashboard/purchase-requests' },
  {
    title: 'Заявки на покупку кладовой',
    href: '/admin/dashboard/pantry-purchase-requests',
  },
  { title: 'Заявки на звонок', href: '/admin/dashboard/call-requests' },
]
