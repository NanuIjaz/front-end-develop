// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Image
import EclipseEvent from '@/public/svg/eclipse-event.svg';

// Type
import { TCourse } from '@/types/courses.type';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const EventCard = ({ data }: { data: TCourse }) => {
  return (
    <div className='relative rounded-xs min-h-[403px] p-5'>
      {data.acf.hero.image_hero.url && (
        <Image
          src={data.acf.hero.image_hero.url}
          priority
          quality={100}
          width={1000}
          height={1000}
          alt='Event Image'
          className='absolute top-0 bottom-0 right-0 left-0 z-0 w-full h-full aspect-auto rounded-xs object-cover object-center'
        />
      )}

      <div className='bg-navy-50 dark:bg-navy-500 rounded-sm p-6 absolute bottom-5 flex flex-col gap-5 left-5 right-5 min-h-[225px]'>
        <div className='flex flex-col gap-3'>
          <p className='font-medium text-xs capitalize !text-navy dark:!text-white'>
            {data.acf.category[0].name}
          </p>
          <h1
            className='text-lg font-bold'
            dangerouslySetInnerHTML={{
              __html: data.title.rendered ?? data.yoast_head_json.og_title,
            }}
          ></h1>
        </div>
        <p className='font-medium text-xs xl:text-base !text-navy dark:!text-white'>
          {data.acf.schedule_and_syllabus.schedule.description_schedule}
        </p>
        <Link href={`/courses/${data.slug}`}>
          <Button variant='white' className='w-fit'>
            {data.acf.course_status}
          </Button>
        </Link>

        <Image
          src={EclipseEvent}
          alt='Eclipse Event'
          className='absolute bottom-0 right-0 rounded-br-sm'
        />
      </div>
    </div>
  );
};

EventCard.displayName = 'EventCard';

export default EventCard;
