interface IParkingPlaceStatusMarking {
  color: string
  title: string
  icon: string
  iconText: string
}

export const ParkingPlaceStatusMarkings: IParkingPlaceStatusMarking[] = [
  { color: '#6C6C6C', title: 'Свободное место', icon: '', iconText: '195' },
  {
    color: '#D3A31F',
    title: 'Место забронировано',
    icon: '/icons/car-icon.svg',
    iconText: '',
  },
  {
    color: '#B94123',
    title: 'Место продано',
    icon: '/icons/car-icon.svg',
    iconText: '',
  },
  {
    color: '#5F8B32',
    title: 'Кладовое помещение',
    icon: '/icons/pantry-icon.svg',
    iconText: '',
  },
  {
    color: '#6C6C6C',
    title: 'Акция',
    icon: '/icons/discount-icon.svg',
    iconText: '',
  },
]
