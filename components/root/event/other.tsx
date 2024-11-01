// Next
import dynamic from 'next/dynamic';

// Type
import { TEventAcademy } from '@/types/event.type';

// Dynamic Components
const EventCard = dynamic(() => import('@/components/root/event/card'));

const EventOther = ({
  data,
  slug,
}: {
  data: TEventAcademy[];
  slug: string;
}) => {
  const otherEvents = data.filter((event) => event.slug !== slug);

  return (
    <>
      {otherEvents.length >= 1 && (
        <section className='xl:container px-5 2xl:px-0'>
          <div className='flex flex-col gap-10'>
            <h2 className='text-2xl xl:text-[32px]'>Other Events</h2>
            <div className='grid gap-5 grid-cols-1 xl:grid-cols-3 items-center'>
              {data
                .filter((event) => event.slug !== slug)
                .map((event) => (
                  <EventCard data={event} key={event.slug} />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

EventOther.displayName = 'EventOther';

export default EventOther;
