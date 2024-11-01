// Type
import { TEventAcademy } from '@/types/event.type';

// Libs
import DayJS from '@/lib/day';

const EventSchedule = ({ data }: { data: TEventAcademy }) => {
  return (
    <section className='xl:container mt-8 px-5 2xl:px-0'>
      <div className='flex flex-col gap-6 xl:gap-10 w-full'>
        <h2 className='text-2xl xl:text-[32px]'>Schedule Agenda</h2>
        <div className='flex items-center gap-5 xl:gap-6'>
          <div className='flex flex-col gap-2'>
            {data.acf.schedule.length >= 1 &&
              data.acf.schedule.map((time) => (
                <h3
                  className='text-base xl:text-2xl dark:!text-navy-200 uppercase font-bold'
                  key={time.agenda}
                >
                  {time.time.start_time
                    ? DayJS(time.time.start_time, 'HH:mm:ss').format('HH:mm')
                    : '-'}{' '}
                  -{' '}
                  {time.time.times_up
                    ? DayJS(time.time.times_up, 'HH:mm:ss').format('HH:mm')
                    : '-'}
                </h3>
              ))}
          </div>
          <div className='flex flex-col gap-2'>
            {data.acf.schedule.length >= 1 &&
              data.acf.schedule.map((agenda) => (
                <h3
                  className='text-base xl:text-2xl !font-normal dark:!text-navy-200'
                  key={agenda.agenda}
                >
                  {agenda.agenda ?? '-'}
                </h3>
              ))}
          </div>
        </div>
      </div>
      <hr className='mt-24 mb-14 border-black/10 dark:border-white/10' />
    </section>
  );
};

EventSchedule.displayName = 'EventSchedule';

export default EventSchedule;
