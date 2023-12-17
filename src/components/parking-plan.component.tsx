import clsx from 'clsx'
import { useState } from 'react'
import { FloorRecord, FloorRecordEntries } from '../constants/floors-record.constant'
import { PlaceStatusMarkings } from '../constants/place-status-markings.constant'
import Button from './button.component'

export default function ParkingPlan() {
  const [selectedFloor, setSelectedFloor] = useState(1)

  const selectedFloorInfo = FloorRecord[selectedFloor]

  return (
    <div
      id="parking-plan"
      className="max-w-[1920px] mx-auto py-[5.15rem] px-[8.05rem] flex gap-x-[7.25rem]"
    >
      <div className="grow"></div>
      <div className="w-fit">
        <div className="mb-[1.05rem] flex gap-x-[1.4rem]">
          {FloorRecordEntries.map(([floor]) => (
            <div key={floor} className="flex flex-col items-center gap-y-[0.7rem]">
              <Button
                className={clsx(
                  'h-[3.55rem] w-[3.55rem] rounded-full flex justify-center items-center text-[2rem]',
                  Number(floor) === selectedFloor &&
                    'bg-primary-accent border-primary-accent hover:text-primary-accent hover:border-primary-accent'
                )}
                onClick={() => setSelectedFloor(Number(floor))}
              >
                {floor}
              </Button>
              <p className="uppercase">ЭТАЖ</p>
            </div>
          ))}
        </div>
        <p className="text-[2rem] mb-8">{selectedFloorInfo.title}</p>
        <div className="flex justify-between items-center">
          <p>ТИП:</p>
          <p>{selectedFloorInfo.type}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>СРОК СДАЧИ:</p>
          <p>{selectedFloorInfo.deadline}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>МЕСТ В ПРОДАЖЕ:</p>
          <p>{selectedFloorInfo.placesAmount}</p>
        </div>
        <div className="h-[2px] my-8 bg-black" />
        <p className="text-[2rem] mb-8">Статус</p>
        {PlaceStatusMarkings.map((placeStatusMarking) => (
          <div
            key={placeStatusMarking.title}
            className="mb-[0.8rem] flex items-center gap-x-5"
          >
            <div
              className={clsx(
                'h-[1.65rem] w-[1.65rem] rounded-full',
                placeStatusMarking.color
              )}
            />
            <p>{placeStatusMarking.title}</p>
          </div>
        ))}
        <div className="h-[2px] mt-14 mb-[1.65rem] bg-black" />
        <div className="px-[1.8rem] flex justify-between items-center">
          <img src="/icons/print-icon.svg" alt="" className="h-[2.1rem] w-[2.15rem]" />
          <img src="/icons/pdf-icon.svg" alt="" className="h-[1.85rem] w-[2.19rem]" />
          <img src="/icons/mail-icon.svg" alt="" className="h-[1.46rem] w-[2.23rem]" />
        </div>
      </div>
    </div>
  )
}
