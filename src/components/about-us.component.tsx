import { Modal } from '@mantine/core'
import { useState } from 'react'
import Button from '../shared-ui/button.component'
import ContactForm from './contact-form.component'
import Section from './section.component'

enum ModalTypes {
  Form,
  Success,
  Error,
}

export default function AboutUs() {
  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)

  return (
    <Section className="bg-about-us md:bg-left text-white bg-cover lg:bg-center px-5 lg:px-[8.1rem] flex flex-col justify-center">
      <div className="mb-12 lg:mb-0 lg:text-xl bg-cover">
        <h2 className="mb-10 lg:mb-16 text-5xl lg:text-4xl font-bold">О нас</h2>
        <p className="mb-10 lg:mb-16 lg:w-2/5 md:w-3/5 sm:w-full">
          Мы - группа компаний, занимающаяся переустройством нежилых зданий в
          Санкт-Петербурге и Ленинградской области. Наша команда активно работает с 2015
          года и имеет на счету уже более 15 реализованных проектов. Мы предоставляем
          новые возможности как для жильцов, так и для бизнеса. За 9 лет работы мы помогли
          более ста арендаторам найти помещения для своего бизнеса, инвесторам получить
          возможность иметь пассивный доход, и более тысячи жильцов получили возможность
          приобрести парковочные и кладовые места в собственность.
        </p>
      </div>

      <div>
        <Button
          className="py-4 px-12 lg:text-xl uppercase shadow-md"
          onClick={() => setOpenedModalType(ModalTypes.Form)}
        >
          Связаться с нами
        </Button>
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
    </Section>
  )
}
