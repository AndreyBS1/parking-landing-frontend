import { createPortal } from 'react-dom'

interface IImageViewerProps {
  imageSrc?: string
  isOpen?: boolean
  onClose?: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export default function ImageViewer(props: IImageViewerProps) {
  const { imageSrc = '', isOpen = false, onClose, onNext, onPrevious } = props

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 px-72 flex items-center">
      <div className="absolute inset-0 bg-black-transparent-70" onClick={onClose} />
      <button
        className="flex absolute top-5 right-5 z-10 w-14 h-14 rounded-full justify-center items-center bg-white"
        onClick={onClose}
      >
        <img src="/icons/cross-icon.svg" alt="Close" className="w-9 h-9" />
      </button>
      <div className="relative grow flex gap-x-10 z-10">
        <div className="flex items-center">
          <button
            className="flex w-14 h-14 rounded-full justify-center items-center bg-white"
            onClick={onPrevious}
          >
            <img
              src="/icons/up-arrow.svg"
              alt="Previous news post"
              className="w-9 h-9 -rotate-90"
            />
          </button>
        </div>
        <div className="grow flex items-center">
          <img src={imageSrc} alt="" className="w-full" />
        </div>
        <div className="flex items-center">
          <button
            className="flex w-14 h-14 rounded-full justify-center items-center bg-white"
            onClick={onNext}
          >
            <img
              src="/icons/up-arrow.svg"
              alt="Next news post"
              className="w-9 h-9 rotate-90"
            />
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#image-viewer') as HTMLElement
  )
}
