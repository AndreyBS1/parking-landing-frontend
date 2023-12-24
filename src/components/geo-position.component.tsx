import { Modal } from '@mantine/core'
import { useState } from 'react'
import Button from '../shared-ui/button.component'
import ContactForm from './contact-form.component'

enum ModalTypes {
  Form,
  Success,
  Error,
}

export default function GeoPosition() {
  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)

  return (
    <>
      <div className="bg-secondary">
        <div id="#geo-position" className="max-w-[1920px] mx-auto flex">
          <div className="px-[8.1rem] py-[5.3rem]">
            <h2 className="mb-8 text-[2rem]">Местоположение</h2>
            <p className="mb-6">
              Паркинг расположен в элитном жилом комплексе "Еропкинский 16" в самом центре
              Москвы - в Еропкинском переулке, который соединяет улицы Остоженка и
              Пречистенка. Въезд и выезд в паркинг осуществляется с Мансуровского
              переулка. Паркинг имеет два теплых уровня, высокие потолки и комфортные
              широкие спуски под любой легковой транспорт. Площадь машиномест от 11,1 до
              28 кв. метров. Доступ осуществляется через четыре лифта. Ведется
              круглосуточная видеозапись за всеми машиноместами.
            </p>
            <p className="mb-16">
              Жилой комплекс переменной этажности "Еропкинский 16" возведен в 2011 году. В
              его состав кроме новых корпусов входит главное здание усадьбы
              Татищева-Лопухина - отреставрированный особняк начала XIX века.
            </p>
            <Button
              className="px-[3.55rem] py-[1.3rem]"
              onClick={() => setOpenedModalType(ModalTypes.Form)}
            >
              Связаться с нами
            </Button>
          </div>
          <img
            src="/images/geo-position.jpeg"
            alt="Местоположение"
            className="w-[47.5rem] object-cover object-center"
          />
        </div>
      </div>

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
          Похоже, что возникла какая-то ошибка. Пожалуйста, оставьте заявку с помощью
          контактной формы.
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
