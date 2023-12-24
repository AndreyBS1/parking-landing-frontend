interface IParkingPlaceStatusMarking {
  color: string
  title: string
}

export const ParkingPlaceStatusMarkings: IParkingPlaceStatusMarking[] = [
  { color: 'bg-secondary-accent', title: 'Свободное место' },
  { color: 'bg-primary-accent', title: 'Место забронировано' },
  { color: 'bg-primary', title: 'Место продано' },
]
