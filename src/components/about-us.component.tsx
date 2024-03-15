import { Modal } from '@mantine/core'
import { useState } from 'react'
import ContactForm from './contact-form.component'
import Button from '../shared-ui/button.component'
import Section from './section.component'

enum ModalTypes {
  Form,
  Success,
  Error,
}

export default function AboutUs() {
  const [openedModalType, setOpenedModalType] = useState<ModalTypes | null>(null)


  return (
    <Section className="bg-aboutUs md:bg-left text-white bg-cover lg:bg-center px-5 lg:px-[8.1rem] flex flex-col justify-center">
      <div className="mb-12 lg:mb-0 lg:text-xl bg-cover">
        <h2 className="mb-10 lg:mb-14 text-5xl lg:text-4xl font-bold">О нас</h2>
        <p className="mb-6 lg:mb-10 lg:w-2/5 md:w-3/5 sm:w-full">
          Мы - группа компаний, занимающаяся редевелопментом (переустройством) отдельностоящих нежилых
          зданий по г. Санкт-Петербургу и Ленинградской области.  Наша команда активно работает 2015
          года и имеет на счету уже более 15 реализованных проектов. Своими действиями мы предоставляем
          новые возможности как для жильцов, так и для бизнеса. За столько то лет мы помогли стольким то
          арендаторам найти помещение для своего бизнеса, стольким то инвесторам получить возможность иметь
          пассивный доход и стольким-то жильцам приобрести парковочные и кладовые места в собственность.
        </p>
      </div>


      <div className="flex flex-col justify-center items-start">
        <Button
          className="mb-5 py-4 px-12 lg:text-xl uppercase shadow-md"
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