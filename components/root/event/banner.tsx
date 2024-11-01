// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Icon
import { SquareArrowOutUpRight } from 'lucide-react';

// Type
import { TEventAcademy } from '@/types/event.type';

// Libs
import DayJS from '@/lib/day';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);
const Card = dynamic(() =>
  import('@/components/ui/card').then((cards) => cards.Card),
);
const CardContent = dynamic(() =>
  import('@/components/ui/card').then((cards) => cards.CardContent),
);

const EventBanner = ({ data }: { data: TEventAcademy }) => {
  return (
    <section
      className='h-full xl:h-screen xl:pt-[91px] max-lg:relative'
      id='event-detail-banner'
    >
      {data.acf.featured_image.url ? (
        <Image
          src={data.acf.featured_image.url}
          width={1000}
          height={1000}
          priority
          quality={100}
          alt='Event Detail Banner'
          className='absolute top-0 bottom-0 right-0 left-0 w-full h-full object-cover aspect-auto pointer-events-none xl:!z-[-1]'
        />
      ) : (
        <div className='absolute top-0 bottom-0 right-0 left-0 w-full h-full object-cover aspect-auto pointer-events-none xl:!z-[-1]'></div>
      )}
      <div className='xl:container flex flex-col xl:flex-row items-center justify-between h-full px-5 2xl:px-0 py-16 2xl:py-0 gap-[70px] xl:gap-[159px]'>
        <div className='flex flex-col items-center xl:items-start gap-5 xl:max-w-3xl xl:!z-[-1]'>
          <Link
            href='/'
            className='w-fit items-center link dark:text-white text-navy-700 mb-10 hidden xl:flex'
          >
            Back to home
          </Link>
          <p className='font-medium !text-white text-sm xl:text-base tracking-widest'>
            EVENTS
          </p>
          <h1 className='text-center xl:text-left !text-white'>
            {data.yoast_head_json.og_title}
          </h1>
          <p className='body-m mt-5 !text-white text-sm xl:text-base text-center xl:text-left whitespace-pre-line'>
            {data.acf.short_description_of_the_event}
          </p>
        </div>
        <Card className='xl:min-w-[416px] w-full'>
          <CardContent className='p-6 flex flex-col gap-2'>
            <h2 className='text-[40px] leading-[44px] dark:text-navy-700 text-white'>
              Time & Location
            </h2>
            <p className='font-normal leading-6 dark:text-navy-700 text-white'>
              You can registration this event
            </p>
            <hr className='opacity-10' />
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <p className='font-normal leading-6 dark:!text-navy-700 text-white'>
                  Date & Time
                </p>
                <p className='font-bold leading-4 dark:text-navy-700 text-white'>
                  {DayJS(data.date).format('dddd, MMMM D YYYY')}
                </p>
                <p className='font-normal leading-4 dark:!text-navy-700 text-white uppercase opacity-50'>
                  {data.acf.time.start_time} - {data.acf.time.times_up} GMT+9
                </p>
              </div>
            </div>
            {data.acf.location.location && (
              <>
                <hr className='opacity-10 mt-[65px]' />
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col gap-2'>
                    <p className='font-normal leading-6 dark:!text-navy-700 text-white'>
                      Location
                    </p>
                    <p className='font-bold leading-4 dark:text-navy-700 text-white'>
                      {data.acf.location.location}
                    </p>
                    <p className='font-normal leading-4 dark:!text-navy-700 text-white opacity-50'>
                      {data.acf.location.city}
                    </p>
                  </div>
                  {data.acf.location.map_url.url && (
                    <Link
                      target='_blank'
                      href={data.acf.location.map_url.url ?? '#'}
                      className='text-navy-700 w-fit flex items-center link dark:text-navy-700 text-white'
                    >
                      View on Map
                      <SquareArrowOutUpRight className='ml-2 w-4 h-4 aspect-square' />
                    </Link>
                  )}
                </div>
              </>
            )}
            <Link
              href={data.acf.booking_button.url.url ?? '#'}
              className='w-full'
            >
              <Button
                className='flex justify-between items-center mt-5 w-full'
                size='md'
              >
                {data.acf.booking_button.label}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

EventBanner.displayName = 'EventBanner';

export default EventBanner;
