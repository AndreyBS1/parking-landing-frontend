interface IPantryPlaceStatusMarking {
  color: string
  title: string
  icon: string
  iconText: string
}

export const PantryPlaceStatusMarkings: IPantryPlaceStatusMarking[] = [
  {
    color: '#5F8B32',
    title: 'Свободное кладовое помещение',
    icon: '/icons/pantry-icon.svg',
    iconText: '',
  },
  {
    color: '#D3A31F',
    title: 'Кладовое помещение забронировано',
    icon: '/icons/pantry-icon.svg',
    iconText: '',
  },
  {
    color: '#B94123',
    title: 'Кладовое помещение продано',
    icon: '/icons/pantry-icon.svg',
    iconText: '',
  },
  {
    color: '#6C6C6C',
    title: 'Зона разгрузки',
    icon: '',
    iconText: 'P',
  },
  {
    color: '#6C6C6C',
    title: 'Лифт',
    icon: '/icons/elevator-icon.png',
    iconText: '',
  },
  {
    color: '#6C6C6C',
    title: 'Акция',
    icon: '/icons/discount-icon.svg',
    iconText: '',
  },
]
