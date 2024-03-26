import clsx from 'clsx'
import { useState } from 'react'
import Section from './section.component'

const Photos = [
  '/images/photos/photo-1.jpeg',
  '/images/photos/photo-2.jpeg',
  '/images/photos/photo-3.jpeg',
  '/images/photos/photo-4.jpeg',
  '/images/photos/photo-5.jpeg',
  '/images/photos/photo-6.jpeg',
  null,
  null,
  '/images/photos/photo-7.jpeg',
  '/images/photos/photo-8.jpeg',
  '/images/photos/photo-9.jpeg',
  '/images/photos/photo-10.jpeg',
]

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  const handlePreviousPhotoClick = () => {
    if (selectedPhotoIndex === null) {
      return
    }
    if (selectedPhotoIndex <= 0) {
      setSelectedPhotoIndex(Photos.length - 1)
      return
    }
    if (selectedPhotoIndex === 8) {
      setSelectedPhotoIndex(5)
      return
    }
    setSelectedPhotoIndex(selectedPhotoIndex - 1)
  }

  const handleNextPhotoClick = () => {
    if (selectedPhotoIndex === null) {
      return
    }
    if (selectedPhotoIndex >= Photos.length - 1) {
      setSelectedPhotoIndex(0)
      return
    }
    if (selectedPhotoIndex === 5) {
      setSelectedPhotoIndex(8)
      return
    }
    setSelectedPhotoIndex(selectedPhotoIndex + 1)
  }

  return (
    <Section
      id="photo-gallery"
      className="pt-24 lg:pt-0 bg-additional flex flex-col justify-center items-center"
    >
      <h2 className="w-full px-5 lg:px-[8.1rem] mb-16 text-5xl lg:text-4xl font-bold text-white">
        Фотогалерея
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {Photos.map((photo, index) => (
          <>
            {photo ? (
              <button
                className={clsx(
                  'cursor-pointer',
                  index === 1 && 'lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-3'
                )}
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <img
                  key={index}
                  src={photo}
                  className="w-full object-cover object-center"
                  alt=""
                />
              </button>
            ) : (
              <div />
            )}
          </>
        ))}
      </div>

      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 px-72 flex items-center">
          <div
            className="absolute inset-0 bg-black-transparent-70"
            onClick={() => setSelectedPhotoIndex(null)}
          />
          <button
            className="flex absolute top-5 right-5 z-10 w-14 h-14 rounded-full justify-center items-center bg-white"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <img src="/icons/cross-icon.svg" alt="Close" className="w-9 h-9" />
          </button>
          <div className="relative grow flex gap-x-10 z-10">
            <div className="flex items-center">
              <button
                className="flex w-14 h-14 rounded-full justify-center items-center bg-white"
                onClick={handlePreviousPhotoClick}
              >
                <img
                  src="/icons/up-arrow.svg"
                  alt="Previous news post"
                  className="w-9 h-9 -rotate-90"
                />
              </button>
            </div>
            <div className="grow flex items-center">
              <img src={Photos[selectedPhotoIndex] ?? ''} alt="" className="w-full" />
            </div>
            <div className="flex items-center">
              <button
                className="flex w-14 h-14 rounded-full justify-center items-center bg-white"
                onClick={handleNextPhotoClick}
              >
                <img
                  src="/icons/up-arrow.svg"
                  alt="Next news post"
                  className="w-9 h-9 rotate-90"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
