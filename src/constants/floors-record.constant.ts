interface IFloor {
  title: string
  type: string
  deadline: string
  placesAmount: number
}

export const FloorRecord: Record<number, IFloor> = {
  1: {
    title: 'Первый этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '1 КВ. 2024 Г.',
    placesAmount: 85,
  },
  2: {
    title: 'Второй этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '1 КВ. 2024 Г.',
    placesAmount: 85,
  },
  3: {
    title: 'Третий этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '1 КВ. 2024 Г.',
    placesAmount: 85,
  },
  4: {
    title: 'Четвертый этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '1 КВ. 2024 Г.',
    placesAmount: 85,
  },
  5: {
    title: 'Пятый этаж',
    type: 'НАЗЕМНЫЙ',
    deadline: '1 КВ. 2024 Г.',
    placesAmount: 85,
  },
}

export const FloorRecordEntries = Object.entries(FloorRecord)
