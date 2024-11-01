// Type
import { TEventAcademy } from '@/types/event.type';

const EventDescription = ({ data }: { data: TEventAcademy }) => {
  return (
    <section className='bg-navy-50 dark:bg-navy-600'>
      <div className='xl:container !py-20 flex flex-col gap-6 xl:gap-12 px-5 2xl:px-0'>
        <h2 className='text-2xl lg:text-[32px]'>Description Event</h2>
        <p className='font-normal text-sm lg:text-xl dark:text-navy-200 text-navy-400 leading-[30px] whitespace-pre-line'>
          {data.yoast_head_json.og_description}
        </p>
      </div>
    </section>
  );
};

EventDescription.displayName = 'EventDescription';

export default EventDescription;
