import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Button from '../shared-ui/button.component'

const Photos = [
  '/images/photos/photo-1.jpeg',
  '/images/photos/photo-2.jpeg',
  null,
  '/images/photos/photo-3.jpeg',
  '/images/photos/photo-4.jpeg',
  '/images/photos/photo-5.jpeg',
  null,
  null,
  '/images/photos/photo-6.jpeg',
  '/images/photos/photo-7.jpeg',
  '/images/photos/photo-8.jpeg',
  '/images/photos/photo-9.jpeg',
]

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  useEffect(() => {
    if (selectedPhotoIndex === null) {
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedPhotoIndex])

  const handlePreviousPhotoClick = () => {
    if (selectedPhotoIndex === null) {
      return
    }
    if (selectedPhotoIndex <= 0) {
      setSelectedPhotoIndex(Photos.length - 1)
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
    setSelectedPhotoIndex(selectedPhotoIndex + 1)
  }

  return (
    <>
      <div id="photo-gallery" className="grid grid-cols-5 bg-additional">
        {Photos.map((photo, index) =>
          photo !== null ? (
            <button
              className={clsx(
                index === 1 && 'col-start-2 col-end-4 row-start-1 row-end-3'
              )}
              onClick={() => setSelectedPhotoIndex(photo !== null ? index : null)}
            >
              <img
                key={index}
                src={photo}
                alt=""
                className="aspect-video object-cover object-center"
              />
            </button>
          ) : (
            <div key={index} />
          )
        )}
      </div>

      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 px-72 flex items-center">
          <div
            className="absolute inset-0 bg-black-transparent-70"
            onClick={() => setSelectedPhotoIndex(null)}
          />
          <button
            className="block absolute top-8 right-10 z-10"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <p className="text-2xl text-white">X</p>
          </button>
          <div className="relative grow flex gap-x-10 z-10">
            <div className="flex items-center">
              <Button onClick={handlePreviousPhotoClick}>
                <div className="w-10 h-10 flex justify-center items-center">
                  <p>{'<'}</p>
                </div>
              </Button>
            </div>
            <div className="grow flex items-center">
              <img src={Photos[selectedPhotoIndex] ?? ''} alt="" className="w-full" />
            </div>
            <div className="flex items-center">
              <Button onClick={handleNextPhotoClick}>
                <div className="w-10 h-10 flex justify-center items-center">
                  <p>{'>'}</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
