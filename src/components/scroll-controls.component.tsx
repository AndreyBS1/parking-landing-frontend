import { useRef } from 'react'
import { ScrollLinks } from '../constants/links.constant'

export default function ScrollControls() {
  const sectionIndexRef = useRef(0)

  const handleScroll = (dir: 'up' | 'down') => {
    let sectionIndex = sectionIndexRef.current
    if (dir === 'up' && sectionIndex > 0) {
      sectionIndex -= 1
    }
    if (dir === 'down' && sectionIndex < ScrollLinks.length - 1) {
      sectionIndex += 1
    }
    const { selector } = ScrollLinks[sectionIndex]
    const sectionElement = document.querySelector(selector)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
      sectionIndexRef.current = sectionIndex
    }
  }

  // useEffect(() => {
  //   let lastScrollPosition = 0
  //   let currentScrollPosition = 0
  //   let ticking = false

  //   function onScroll(event: WheelEvent) {
  //     console.log('event fired')
  //     currentScrollPosition = event.deltaY
  //     if (ticking) {
  //       return
  //     }
  //     window.requestAnimationFrame(() => {
  //       console.log('lastScrollPosition:', lastScrollPosition)
  //       console.log('currentScrollPosition:', currentScrollPosition)
  //       if (currentScrollPosition < lastScrollPosition) {
  //         console.log('scroll up')
  //         handleScroll('up')
  //         lastScrollPosition = currentScrollPosition
  //       }
  //       if (currentScrollPosition > lastScrollPosition) {
  //         console.log('scroll down')
  //         handleScroll('down')
  //         lastScrollPosition = currentScrollPosition
  //       }
  //       setTimeout(() => {
  //         ticking = false
  //         lastScrollPosition = 0
  //       }, 2500)
  //     })
  //     ticking = true
  //   }

  //   document.addEventListener('wheel', onScroll)
  //   return () => {
  //     document.removeEventListener('wheel', onScroll)
  //   }
  // }, [])

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-y-5">
      <button
        className="w-14 h-14 flex items-center justify-center bg-white border border-gray rounded-full"
        onClick={() => handleScroll('up')}
      >
        <img src="/icons/up-arrow.svg" alt="Scroll up" className="w-9 h-9" />
      </button>
      <button
        className="w-14 h-14 flex items-center justify-center bg-white border border-gray rounded-full"
        onClick={() => handleScroll('down')}
      >
        <img src="/icons/up-arrow.svg" alt="Scroll down" className="w-9 h-9 rotate-180" />
      </button>
    </div>
  )
}
