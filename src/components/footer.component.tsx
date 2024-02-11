import { Modal } from '@mantine/core'
import { useState } from 'react'
import Button from '../shared-ui/button.component'
import Link from '../shared-ui/link.component'
import ContactForm from './contact-form.component'

enum ModalTypes {
  Form,
  Success,
  Error,
}

export default function Footer() {
  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)

  return (
    <>
      <footer
        id="contacts"
        className="bg-additional text-white pt-14 pb-20 px-10 lg:pl-32 lg:pr-28 lg:flex justify-between items-end"
      >
        <div className="mb-14 lg:mb-0">
          <h2 className="text-5xl font-bold">Контакты</h2>
          <p className="mb-6">
            Адрес: г. Санкт-Петербург, Комендантский
            <br />
            проспект, дом 66, корпус 2
          </p>
          <p>Телефон:</p>
          <Link
            href="tel:+79117751111"
            target="_blank"
            rel="noreferrer"
            className="mb-6 block"
          >
            +7 (911) 775-11-11
          </Link>
          <p className="mb-6">
            Email:{' '}
            <Link
              href="mail:sales@parking-chistoenebo.ru"
              target="_blank"
              rel="noreferrer"
              className="lowercase"
            >
              sales@parking-chistoenebo.ru
            </Link>
          </p>
          <p>
            Запишитесь на бесплатную консультацию{' '}
            <button
              className="bg-none border-none underline underline-offset-2 hover:text-primary transition-colors"
              onClick={() => setOpenedModalType(ModalTypes.Form)}
            >
              тут
            </button>
          </p>
        </div>
        <div>
          <img src="/images/logo.png" alt="" className="w-[2.65rem]" />
        </div>
      </footer>

      <Modal
        opened={openedModalType === ModalTypes.Form}
        title="Оставьте свои данные, и наш менеджер свяжется с вами"
        centered
        zIndex={1000}
        size="xl"
        classNames={{
          content: 'rounded-[2rem]',
          header: 'py-[2.05rem] pl-[3.4rem] pr-[2.9rem]',
          title: 'text-[2rem]',
          body: 'pb-[2.75rem] pl-[3.4rem] pr-[4.1rem]',
        }}
        closeButtonProps={{ size: 'xl' }}
        onClose={() => setOpenedModalType(null)}
      >
        <ContactForm
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
        <h1 className="mb-10 text-[2rem] text-center">
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
          Похоже, что возникла какая-то ошибка. Пожалуйста, попробуйте позже.
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
