// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Type
import { THomeData } from '@/types/home.type';
import { TEventAcademy } from '@/types/event.type';

// Libs
import DayJS from '@/lib/day';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

// Dynamic Icon
const IconCalendar = dynamic(() => import('@/components/icon/calendar'));

const HomeUpcomingEvents = ({
  data,
  events,
}: {
  data: Pick<THomeData, 'upcoming_event'>;
  events: TEventAcademy[];
}) => {
  const { heading, description } = data.upcoming_event;

  return (
    <section className='xl:container flex flex-col gap-10 xl:gap-24 mt-16 xl:mt-40 px-5 2xl:px-0'>
      <div className='flex flex-col gap-6'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          UPCOMING EVENTS
        </p>
        <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6 xl:gap-0'>
          <h2 className='text-2xl xl:text-[32px]'>{heading}</h2>
          <p className='body-m xl:max-w-[600px] text-left xl:text-right !text-navy-400 dark:!text-navy-200'>
            {description}
          </p>
        </div>
      </div>
      {events.length >= 1 ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-5'>
          {events.map((event) => (
            <div className='rounded-xs flex flex-col gap-6' key={event.id}>
              {event.acf.featured_image.url ? (
                <Image
                  src={event.acf.featured_image.url}
                  priority
                  width={415}
                  unoptimized
                  height={250}
                  quality={100}
                  alt='Event Image'
                  className='aspect-auto object-cover max-h-[240px] rounded-xs w-full'
                />
              ) : (
                <div className='h-[240px]'></div>
              )}
              <div className='flex flex-col gap-4'>
                <p className='text-sm xl:text-base font-medium dark:text-navy-400 capitalize'>
                  {event.yoast_head_json.og_type}
                </p>
                <h3 className='text-xl line-clamp-1'>
                  {event.yoast_head_json.title}
                </h3>
                <p className='text-sm xl:text-base dark:text-navy-200 line-clamp-2'>
                  {event.yoast_head_json.og_description}
                </p>
                <div className='flex gap-3 items-center'>
                  <div className='filter-navy-700 dark:filter-white'>
                    <IconCalendar />
                  </div>
                  <p>
                    {event.acf.date &&
                      DayJS(event.acf.date, 'DD/MM/YYYY').format(
                        'DD MMMM YYYY',
                      )}
                  </p>
                </div>
              </div>
              <Link href={`/event/${event.slug}`}>
                <Button className='w-fit' variant='white'>
                  Learn More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-full h-80 flex items-center justify-center'>
          <p className='font-normal dark:!text-navy-400'>
            There is no event at the moment
          </p>
        </div>
      )}
    </section>
  );
};

HomeUpcomingEvents.displayName = 'HomeUpcomingEvents';

export default HomeUpcomingEvents;
