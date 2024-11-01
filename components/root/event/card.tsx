// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Icon
import { CalendarDays } from 'lucide-react';

// Type
import { TEventAcademy } from '@/types/event.type';

// Libs
import DayJS from '@/lib/day';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const EventCard = ({ data }: { data: TEventAcademy }) => {
  return (
    <div className='rounded-xs flex flex-col gap-6' key={data.id}>
      {data.acf.featured_image.url ? (
        <Image
          src={data.acf.featured_image.url}
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
        <p className='font-medium dark:text-navy-400 capitalize'>
          {data.yoast_head_json.og_type}
        </p>
        <h3 className='text-xl line-clamp-1'>{data.yoast_head_json.title}</h3>
        <p className='dark:text-navy-200 line-clamp-2'>
          {data.yoast_head_json.og_description}
        </p>
        <div className='flex gap-3 items-center'>
          <CalendarDays />
          <p>
            {data.acf.date &&
              DayJS(data.acf.date, 'DD/MM/YYYY').format('DD MMMM YYYY')}
          </p>
        </div>
      </div>
      <Link href={`/event/${data.slug}`}>
        <Button className='w-fit' variant='white'>
          Learn More
        </Button>
      </Link>
    </div>
  );
};

EventCard.displayName = 'EventCard';

export default EventCard;
