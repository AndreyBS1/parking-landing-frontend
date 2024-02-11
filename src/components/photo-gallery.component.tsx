import clsx from 'clsx'

const Photos = [
  '/images/photos/photo-1.jpeg',
  '/images/photos/photo-2.jpeg',
  '/images/photos/photo-3.jpeg',
  '/images/photos/photo-4.jpeg',
  '/images/photos/photo-5.jpeg',
]

export default function PhotoGallery() {
  return (
    <section id="photo-gallery" className="grid grid-cols-1 lg:grid-cols-4 bg-additional">
      {Photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt=""
          className={clsx(
            'hidden lg:block w-full aspect-[16_/_8] object-cover object-center',
            index === 1 && 'lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-3'
          )}
        />
      ))}
    </section>
  )
}
