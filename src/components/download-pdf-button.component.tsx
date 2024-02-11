import html2canvas from 'html2canvas'
// import { jsPDF } from 'jspdf'

export default function DownloadPdfButton() {
  const handleClick = async () => {
    const element = document.querySelector('#parking-plan')
    if (!element) {
      return
    }
    const canvas = await html2canvas(element as HTMLElement, { imageTimeout: 0 })
    const imageDataUrl = canvas.toDataURL('image/jpeg')
    window.open(imageDataUrl, '_blanc', 'noreferrer')

    // const pdf = new jsPDF()
    // pdf.addImage(imageDataUrl, 'JPEG', 0, 0, canvas.width, canvas.height)
    // pdf.addImage(canvas, 'JPEG', 0, 0, canvas.width, canvas.height)
    // pdf.save('parking-chistoe-nebo.pdf')
    // const pdf = new jsPDF()
    // pdf.html(element as HTMLElement, {
    //   x: 0,
    //   y: 0,
    //   image: { quality: 1, type: 'jpeg' },
    //   width: element.clientWidth,
    //   windowWidth: window.innerWidth,
    //   callback: (doc) => doc.save('parking-chistoe-nebo.pdf'),
    // })
    // pdf.save('parking-chistoe-nebo.pdf')
  }

  return (
    <button onClick={handleClick}>
      <img src="/icons/pdf-icon.svg" alt="Download as PDF" className="w-8" />
    </button>
  )
}
