import Link from '../shared-ui/link.component'

export default function Header() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 bg-black-transparent-70 h-24 px-[1.35rem] flex justify-between items-center">
      <img src="/images/logo.png" alt="" className="w-10 lg:w-14" />
      <div className="justify-self-end">
        <Link
          href="tel:+79117751111"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-white lg:text-xl"
        >
          +7 (911) 775-11-11
        </Link>
      </div>
    </header>
  )
}
