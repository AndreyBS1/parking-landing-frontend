import { Loader, Modal, NumberFormatter } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useState } from 'react'
import { getParkingPlaces } from '../api/get-parking-places'
import { FloorRecord, FloorRecordEntries } from '../constants/floors-record.constant'
import { ParkingPlaceStatusMarkings } from '../constants/parking-place-status-markings.constant'
import { ParkingPlaceTypesRecord } from '../constants/parking-place-types-record.constant'
import { ParkingPlanImagesRecord } from '../constants/parking-plan-images-record'
import Button from '../shared-ui/button.component'
import ParkingPlaceBookingForm from './parking-place-booking-form.component'
import ParkingPlace from './parking-place.component'

enum ModalTypes {
  Form,
  Success,
  Error,
}

export default function ParkingPlan() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['parking-places'],
    queryFn: getParkingPlaces,
  })

  const [selectedFloor, setSelectedFloor] = useState(1)
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null)
  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)

  if (isLoading) {
    return (
      <div
        id="parking-plan"
        className="h-[48.5rem] max-w-[1920px] mx-auto flex flex-col justify-center items-center"
      >
        <Loader color="#F9B004" />
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div
        id="parking-plan"
        className="h-[48.5rem] max-w-[1920px] mx-auto flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl mb-2">Похоже, что возникла какая-то ошибка</h2>
        <p className="text-xl mb-6">
          Пожалуйста, оставьте заявку с помощью формы, и мы свяжемся с вами позже
        </p>
        <Button className="py-[0.8rem] px-[1.75rem]">Оставить заявку</Button>
      </div>
    )
  }

  const selectedFloorInfo = FloorRecord[selectedFloor]
  const parkingPlanImage = ParkingPlanImagesRecord[selectedFloor]
  const parkingPlaces = data.filter((place) => place.floor === selectedFloor)
  const selectedPlace =
    selectedPlaceId !== null
      ? parkingPlaces.find((place) => place.id === selectedPlaceId)
      : null
  const selectedPlaceType = selectedPlace
    ? ParkingPlaceTypesRecord[selectedPlace.type]
    : ''

  const handlePlaceSelect = (id: number) => {
    setSelectedPlaceId(id)
    setOpenedModalType(ModalTypes.Form)
  }

  return (
    <>
      <div
        id="parking-plan"
        className="max-w-[1920px] mx-auto py-[5.15rem] px-[8.05rem] flex gap-x-[7.25rem]"
      >
        <div className="grow relative">
          <img src={parkingPlanImage} alt="" />
          {parkingPlaces.map((parkingPlace) => (
            <ParkingPlace
              key={parkingPlace.id}
              parkingPlace={parkingPlace}
              className="absolute"
              onSelect={handlePlaceSelect}
            />
          ))}
        </div>
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
          {ParkingPlaceStatusMarkings.map((placeStatusMarking) => (
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

      <Modal
        opened={openedModalType === ModalTypes.Form}
        title="Заявка на бронирование паркинга"
        centered
        zIndex={1000}
        size="xl"
        classNames={{
          content: 'rounded-[2rem]',
          header: 'py-[2.05rem] pl-[3.4rem] pr-[2.9rem]',
          title: 'text-[2rem]',
          body: 'pb-[2.75rem] pl-[3.4rem] pr-[4.1rem]',
        }}
        closeButtonProps={{ size: 'xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <h1 className="mb-5 text-[2rem]">Место №{selectedPlace?.id}</h1>
        <div className="flex gap-x-12">
          <div className="flex gap-x-4">
            <p>Площадь:</p>
            <p>{selectedPlace?.area} м2</p>
          </div>
          <div className="flex gap-x-4">
            <p>Тип места:</p>
            <p>{selectedPlaceType}</p>
          </div>
          <div className="h-16 flex gap-x-4">
            <p>Стоимость:</p>
            <div>
              {!!selectedPlace?.previousPrice && (
                <NumberFormatter
                  suffix="₽"
                  thousandSeparator=" "
                  value={selectedPlace.previousPrice}
                  className="block line-through"
                />
              )}
              <NumberFormatter
                suffix="₽"
                thousandSeparator=" "
                value={selectedPlace?.currentPrice}
              />
            </div>
          </div>
        </div>
        <ParkingPlaceBookingForm
          parkingPlaceId={selectedPlaceId || 0}
          onSubmit={() => setOpenedModalType(ModalTypes.Success)}
          onError={() => setOpenedModalType(ModalTypes.Error)}
        />
      </Modal>

      <Modal
        opened={openedModalType === ModalTypes.Success}
        withCloseButton={false}
        centered
        zIndex={1000}
        size="xl"
        classNames={{
          content: 'rounded-[2rem]',
          body: 'pt-[3.65rem] pb-[2.75rem] px-[3.1rem]',
        }}
        closeButtonProps={{ size: 'xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <img
          src="/icons/success.svg"
          alt=""
          className="mx-auto h-[5.35rem] w-[5.35rem] mb-10"
        />
        <h1 className="mb-10 text-[2rem] text-center">
          Спасибо за обращение! В ближайшее время наш менеджер свяжется с Вами.
        </h1>
        <Button
          className="block mx-auto py-1 px-12"
          onClick={() => setOpenedModalType(null)}
        >
          Закрыть
        </Button>
      </Modal>

      <Modal
        opened={openedModalType === ModalTypes.Error}
        withCloseButton={false}
        centered
        zIndex={1000}
        size="xl"
        classNames={{
          content: 'rounded-[2rem]',
          body: 'pt-[3.65rem] pb-[2.75rem] px-[3.1rem]',
        }}
        closeButtonProps={{ size: 'xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <h1 className="mb-10 text-[2rem] text-center">
          Похоже, что возникла какая-то ошибка. Пожалуйста, оставьте заявку с помощью
          контактной формы.
        </h1>
        <Button
          className="block mx-auto py-1 px-12"
          onClick={() => setOpenedModalType(null)}
        >
          Закрыть
        </Button>
      </Modal>
    </>
  )
}
