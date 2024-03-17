import CardNews from './card-news.component'
import Section from './section.component'
import Button from '../shared-ui/button.component'


export default function NewsProject() {


  return (
    <Section className="bg-aboutPlace md:bg-center text-white bg-cover lg:bg-center px-5 lg:px-[8.1rem]">
      <div className="mb-12 lg:mb-0 lg:text-xl bg-cover">
        <h2 className="mb-3 lg:mb-7 text-5xl lg:text-4xl py-[1.5rem] font-bold">Новости проекта</h2>
        <div className="flex flex-row items-center">
          <CardNews />
          <CardNews />
          <div className="flex flex-col gap-y-[0.7rem]">
            <Button className='h-12 w-12 rounded-full flex justify-center items-center text-2xl'>
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </Section>


  )
}