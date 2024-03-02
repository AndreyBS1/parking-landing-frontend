interface IFloor {
  title: string
  type: string
  deadline: string
  placesAmount: number
}

export const FloorRecord: Record<number, IFloor> = {
  1: {
    title: 'Второй этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '3 АПРЕЛЯ 2024 Г.',
    placesAmount: 85,
  },
  2: {
    title: 'Третий этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '3 АПРЕЛЯ 2024 Г.',
    placesAmount: 78,
  },
  3: {
    title: 'Четвертый этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '3 АПРЕЛЯ 2024 Г.',
    placesAmount: 85,
  },
  4: {
    title: 'Пятый этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '3 АПРЕЛЯ 2024 Г.',
    placesAmount: 85,
  },
  5: {
    title: 'Шестой этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '3 АПРЕЛЯ 2024 Г.',
    placesAmount: 82,
  },
}

export const FloorRecordEntries = Object.entries(FloorRecord)
