import Link from '../shared-ui/link.component'

export default function Header() {
  return (
    <header className="absolute top-0 inset-x-0 bg-black-transparent-70 h-20 px-[1.35rem] flex items-center justify-between">
      <img src="/images/logo.png" alt="" className="w-[2.65rem]" />
      <div className="flex items-center gap-x-7">
        <Link
          href="tel:+79999999999"
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          +7 999 999 99 99
        </Link>
      </div>
    </header>
  )
}
