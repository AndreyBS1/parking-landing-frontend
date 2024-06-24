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
        className="lg:min-h-screen bg-additional text-white pt-14 pb-20 px-10 lg:pl-32 lg:pr-28 flex flex-col justify-between gap-y-6 text-lg"
      >
        <div className="flex flex-col justify-between gap-y-6">
          <h2 className="text-5xl lg:text-4xl font-bold">Контакты</h2>
          <p>
            Адрес: г. Санкт-Петербург, Комендантский проспект,
            <br />
            дом 66, корпус 2
          </p>
          <div>
            <p>Телефон:</p>
            <Link
              href="tel:+79117751111"
              target="_blank"
              rel="noreferrer"
              className="block w-max"
            >
              +7 (911) 775-11-11
            </Link>
          </div>
          <div>
            <p>
              Email:{' '}
              <Link
                href="mailto:9117751111@mail.ru"
                target="_blank"
                rel="noreferrer"
                className="lowercase"
              >
                9117751111@mail.ru
              </Link>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-end gap-x-6">
          <div>
            <p className="mb-8 lg:mb-4">
              Запишитесь на бесплатную консультацию{' '}
              <button
                className="bg-none border-none underline underline-offset-2 hover:text-primary transition-colors"
                onClick={() => setOpenedModalType(ModalTypes.Form)}
              >
                тут
              </button>
            </p>
            <div className="flex gap-x-3">
              <a
                href="https://wa.me/79117751111"
                target="_blank"
                rel="noreferrer"
                className="block cursor-pointer"
              >
                <img
                  src="/icons/whatsapp-white-icon.svg"
                  alt="Whats App"
                  className="h-10 w-10"
                />
              </a>
              <a
                href="https://t.me/+79117751111"
                target="_blank"
                rel="noreferrer"
                className="block cursor-pointer"
              >
                <img
                  src="/icons/telegram-white-icon.svg"
                  alt="Whats App"
                  className="h-10 w-10"
                />
              </a>
            </div>
          </div>
          <div>
            <img src="/images/logo.png" alt="" className="w-[2.65rem]" />
          </div>
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
