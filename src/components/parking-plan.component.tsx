import { Loader, Modal, NumberFormatter } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useState } from 'react'
import { getPantryPlaces } from '../api/get-pantry-places'
import { getParkingPlaces } from '../api/get-parking-places'
import { FloorRecord, FloorRecordEntries } from '../constants/floors-record.constant'
import { ParkingPlaceStatusMarkings } from '../constants/parking-place-status-markings.constant'
import { ParkingPlaceTypesRecord } from '../constants/parking-place-types-record.constant'
import { ParkingPlanImagesRecord } from '../constants/parking-plan-images-record'
import Button from '../shared-ui/button.component'
import Link from '../shared-ui/link.component'
import { IPantryPlace } from '../types/pantry-place.type'
import { IParkingPlace } from '../types/parking-place.type'
import PantryPlace from './pantry-place.component'
import ParkingPlace from './parking-place.component'
import PlaceBookingForm from './place-booking-form.component'
import Section from './section.component'

enum ModalTypes {
  ParkingForm,
  PantryForm,
  Success,
  Error,
}

export default function ParkingPlan() {
  const isDesktop = useMediaQuery('min-width: 1024px')

  const {
    data: parkingPlaces,
    isLoading: isParkingPlacesLoading,
    isError: isParkingPlacesError,
  } = useQuery({
    queryKey: ['parking-places'],
    queryFn: getParkingPlaces,
  })

  const {
    data: pantryPlaces,
    isLoading: isPantryPlacesLoading,
    isError: isPantryPlacesError,
  } = useQuery({
    queryKey: ['pantry-places'],
    queryFn: getPantryPlaces,
  })

  const [selectedFloor, setSelectedFloor] = useState(1)
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState<{
    id: number
    type: 'parking' | 'pantry'
  } | null>(null)
  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)

  const [zoom, setZoom] = useState(0.5)

  if (isParkingPlacesLoading || isPantryPlacesLoading) {
    return (
      <Section id="parking-plan" className="flex flex-col justify-center items-center">
        <Loader color="#F9B004" />
      </Section>
    )
  }

  if (!parkingPlaces || isParkingPlacesError || !pantryPlaces || isPantryPlacesError) {
    return (
      <Section id="parking-plan" className="flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-2">Похоже, что возникла какая-то ошибка</h2>
        <p className="text-xl mb-6">
          Пожалуйста, оставьте заявку с помощью формы, и мы свяжемся с вами позже
        </p>
        <Button className="py-[0.8rem] px-[1.75rem]">Оставить заявку</Button>
      </Section>
    )
  }

  const selectedFloorInfo = FloorRecord[selectedFloor]

  const parkingPlanImage = ParkingPlanImagesRecord[selectedFloor]

  const floorParkingPlaces = parkingPlaces.filter((place) => {
    return place.floor === selectedFloor
  })

  const floorPantryPlaces = pantryPlaces.filter((place) => {
    return place.floor === selectedFloor
  })

  let selectedPlace: IParkingPlace | IPantryPlace | undefined
  if (selectedPlaceInfo?.type === 'parking') {
    selectedPlace = floorParkingPlaces.find((place) => place.id === selectedPlaceInfo.id)
  }
  if (selectedPlaceInfo?.type === 'pantry') {
    selectedPlace = floorPantryPlaces.find((place) => place.id === selectedPlaceInfo.id)
  }

  let selectedPlaceType: string | undefined
  if (selectedPlaceInfo?.type === 'parking' && selectedPlace && 'type' in selectedPlace) {
    selectedPlaceType = ParkingPlaceTypesRecord[selectedPlace.type]
  }

  const handlePlaceSelect = (id: number, type: 'parking' | 'pantry') => {
    setSelectedPlaceInfo({ id, type })
    if (type === 'parking') {
      setOpenedModalType(ModalTypes.ParkingForm)
    }
    if (type === 'pantry') {
      setOpenedModalType(ModalTypes.PantryForm)
    }
  }

  const handleZoomIncrease = () => {
    if (zoom < 1) {
      setZoom((prevZoom) => prevZoom + 0.1)
    }
  }

  const handleZoomDecrease = () => {
    if (zoom > 0.5) {
      setZoom((prevZoom) => prevZoom - 0.1)
    }
  }

  return (
    <>
      {isDesktop ? (
        <Section className="px-[8.05rem] flex justify-center items-center">
          <div className="flex justify-center items-end gap-x-[7.25rem]">
            <div className="relative">
              <img src={parkingPlanImage} alt="" className="w-[53.3rem]" />
              {floorParkingPlaces.map((parkingPlace) => (
                <ParkingPlace
                  key={parkingPlace.id}
                  parkingPlace={parkingPlace}
                  className="absolute"
                  onSelect={() => handlePlaceSelect(parkingPlace.id, 'parking')}
                />
              ))}
              {floorPantryPlaces.map((pantryPlace) => (
                <PantryPlace
                  key={pantryPlace.id}
                  pantryPlace={pantryPlace}
                  className="absolute"
                  onSelect={() => handlePlaceSelect(pantryPlace.id, 'pantry')}
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
                          'bg-steel border-steel hover:text-steel hover:border-steel'
                      )}
                      onClick={() => setSelectedFloor(Number(floor))}
                    >
                      {Number(floor) + 1}
                    </Button>
                    <p className="uppercase">ЭТАЖ</p>
                  </div>
                ))}
              </div>
              <p className="text-3xl mb-6">{selectedFloorInfo.title}</p>
              <div className="mb-3 flex justify-between items-center">
                <p>ТИП:</p>
                <p>{selectedFloorInfo.type}</p>
              </div>
              <div className="mb-3 flex justify-between items-center">
                <p>СРОК ПЕРЕДАЧИ:</p>
                <p>{selectedFloorInfo.deadline}</p>
              </div>
              <div className="mb-3 flex justify-between items-center">
                <p>МЕСТ В ПРОДАЖЕ:</p>
                <p>{selectedFloorInfo.placesAmount}</p>
              </div>
              <div className="h-[2px] my-5 bg-black" />
              <p className="mb-6 text-3xl">Статус</p>
              {ParkingPlaceStatusMarkings.map((placeStatusMarking) => (
                <div
                  key={placeStatusMarking.title}
                  className="mb-4 flex items-center gap-x-5"
                >
                  <div
                    className="h-[1.80rem] w-[1.80rem] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: placeStatusMarking.color }}
                  >
                    {placeStatusMarking.iconText ? (
                      <p className="text-xs text-white">{placeStatusMarking.iconText}</p>
                    ) : (
                      <img
                        src={placeStatusMarking.icon}
                        alt={placeStatusMarking.title}
                        className="w-[1.075rem]"
                      />
                    )}
                  </div>
                  <p>{placeStatusMarking.title}</p>
                </div>
              ))}
              <div className="h-[2px] mt-10 mb-4 bg-black" />
              <div className="flex justify-between items-center gap-x-5">
                <Link
                  href="tel:+79117751111"
                  target="_blank"
                  rel="noreferrer"
                  className="text-3xl"
                >
                  +7 (911) 775-11-11
                </Link>
                {/* <DownloadPdfButton /> */}
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      {!isDesktop ? (
        <Section id="parking-plan" className="py-14 px-5">
          <div className="mb-28">
            <div className="mb-[1.05rem] flex gap-x-5">
              {FloorRecordEntries.map(([floor]) => (
                <div key={floor} className="flex flex-col items-center gap-y-[0.7rem]">
                  <Button
                    className={clsx(
                      'h-12 w-12 rounded-full flex justify-center items-center text-2xl',
                      Number(floor) === selectedFloor &&
                        'bg-steel border-steel hover:text-steel hover:border-steel'
                    )}
                    onClick={() => setSelectedFloor(Number(floor))}
                  >
                    {Number(floor) + 1}
                  </Button>
                  <p className="uppercase">ЭТАЖ</p>
                </div>
              ))}
            </div>
            <p className="text-3xl mb-6">{selectedFloorInfo.title}</p>
            <div className="mb-3 flex justify-between items-center">
              <p>ТИП:</p>
              <p>{selectedFloorInfo.type}</p>
            </div>
            <div className="mb-3 flex justify-between items-center">
              <p>СРОК ПЕРЕДАЧИ:</p>
              <p>{selectedFloorInfo.deadline}</p>
            </div>
            <div className="mb-3 flex justify-between items-center">
              <p>МЕСТ В ПРОДАЖЕ:</p>
              <p>{selectedFloorInfo.placesAmount}</p>
            </div>
            <div className="h-[2px] my-5 bg-black" />
            <p className="mb-6 text-3xl">Статус</p>
            {ParkingPlaceStatusMarkings.map((placeStatusMarking) => (
              <div
                key={placeStatusMarking.title}
                className="mb-4 flex items-center gap-x-5"
              >
                <div
                  className="h-[1.80rem] w-[1.80rem] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: placeStatusMarking.color }}
                >
                  {placeStatusMarking.iconText ? (
                    <p className="text-xs text-white">{placeStatusMarking.iconText}</p>
                  ) : (
                    <img
                      src={placeStatusMarking.icon}
                      alt={placeStatusMarking.title}
                      className="w-[1.075rem]"
                    />
                  )}
                </div>
                <p>{placeStatusMarking.title}</p>
              </div>
            ))}
            <div className="h-[2px] mt-10 mb-4 bg-black" />
            <Link
              href="tel:+79117751111"
              target="_blank"
              rel="noreferrer"
              className="text-3xl"
            >
              +7 (911) 775-11-11
            </Link>
          </div>
          <div className="overflow-auto relative">
            <img
              src={parkingPlanImage}
              alt=""
              className="max-w-none"
              style={{ width: `${zoom * 53}rem` }}
            />
            {floorParkingPlaces.map((parkingPlace) => (
              <ParkingPlace
                key={parkingPlace.id}
                parkingPlace={parkingPlace}
                zoom={zoom}
                className="absolute"
                onSelect={() => handlePlaceSelect(parkingPlace.id, 'parking')}
              />
            ))}
            {floorPantryPlaces.map((pantryPlace) => (
              <PantryPlace
                key={pantryPlace.id}
                pantryPlace={pantryPlace}
                zoom={zoom}
                className="absolute"
                onSelect={() => handlePlaceSelect(pantryPlace.id, 'pantry')}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-center items-center gap-x-6">
            <Button className="w-8 text-xl" onClick={handleZoomDecrease}>
              -
            </Button>
            <Button className="w-8 text-xl" onClick={handleZoomIncrease}>
              +
            </Button>
          </div>
        </Section>
      ) : null}

      <Modal
        opened={openedModalType === ModalTypes.ParkingForm}
        title="Заявка на бронирование паркинга"
        centered
        zIndex={1000}
        size="xl"
        classNames={{
          content: 'rounded-[2rem]',
          header: 'lg:py-[2.05rem] lg:pl-[3.4rem] lg:pr-[2.9rem]',
          title: 'text-2xl lg:text-[2rem]',
          body: 'lg:pb-[2.75rem] lg:pl-[3.4rem] lg:pr-[4.1rem]',
        }}
        closeButtonProps={{ size: 'xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <h1 className="mb-5 text-xl lg:text-[2rem]">
          Место №{selectedPlace?.displayedNo}
        </h1>
        <div className="lg:flex gap-x-12">
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
        <PlaceBookingForm
          placeId={selectedPlaceInfo?.id || 0}
          placeType="parking"
          onSubmit={() => setOpenedModalType(ModalTypes.Success)}
          onError={() => setOpenedModalType(ModalTypes.Error)}
        />
      </Modal>

      <Modal
        opened={openedModalType === ModalTypes.PantryForm}
        title="Заявка на бронирование кладовой"
        centered
        zIndex={1000}
        size="xl"
        classNames={{
          content: 'rounded-[2rem]',
          header: 'lg:py-[2.05rem] lg:pl-[3.4rem] lg:pr-[2.9rem]',
          title: 'text-2xl lg:text-[2rem]',
          body: 'lg:pb-[2.75rem] lg:pl-[3.4rem] lg:pr-[4.1rem]',
        }}
        closeButtonProps={{ size: 'xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <h1 className="mb-5 text-xl lg:text-[2rem]">
          Кладовая №{selectedPlace?.displayedNo}
        </h1>
        <div className="lg:flex gap-x-12">
          <div className="flex gap-x-4">
            <p>Площадь:</p>
            <p>{selectedPlace?.area} м2</p>
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
        <PlaceBookingForm
          placeId={selectedPlaceInfo?.id || 0}
          placeType="pantry"
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
        <h1 className="mb-10 text-xl lg:text-[2rem] text-center">
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
