interface ILink {
  title: string
  selector: string
}

export const Links: ILink[] = [
  { title: 'ПЛАН ПАРКИНГА', selector: '#parking-plan' },
  { title: 'МЕСТОПОЛОЖЕНИЕ', selector: '#geo-position' },
  { title: 'ПРЕИМУЩЕСТВА', selector: '#benefits' },
  { title: 'ФОТОГАЛЕРЕЯ', selector: '#photo-gallery' },
  { title: 'КОНТАКТЫ', selector: '#contacts' },
]
