import { useMediaQuery } from '@mantine/hooks'
import clsx from 'clsx'
import { useState } from 'react'
import ImageViewer from './image-viewer.component'
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
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  const selectedPhoto =
    selectedPhotoIndex !== null ? Photos[selectedPhotoIndex] ?? '' : ''

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
              <>
                {isDesktop ? (
                  <button
                    key={index}
                    className={clsx(
                      'cursor-pointer',
                      index === 1 &&
                        'lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-3'
                    )}
                    onClick={() => setSelectedPhotoIndex(index)}
                  >
                    <img
                      src={photo}
                      className="w-full object-cover object-center"
                      alt=""
                    />
                  </button>
                ) : (
                  <img
                    key={index}
                    src={photo}
                    className="w-full object-cover object-center"
                    alt=""
                  />
                )}
              </>
            ) : (
              <div />
            )}
          </>
        ))}
      </div>

      <ImageViewer
        imageSrc={selectedPhoto}
        isOpen={selectedPhotoIndex !== null}
        onClose={() => setSelectedPhotoIndex(null)}
        onPrevious={handlePreviousPhotoClick}
        onNext={handleNextPhotoClick}
      />
    </Section>
  )
}
