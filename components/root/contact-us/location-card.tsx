// Next
import dynamic from 'next/dynamic';

// Types
import { TContactUsLocationCard } from '@/types/contact-us.type';

// Dynamic Icon
const IconLocation = dynamic(() => import('@/components/icon/location'));

const ContactUsLocationCard = ({ data }: { data: TContactUsLocationCard }) => {
  return (
    <div className='rounded-xs bg-white dark:bg-[#0A313E] flex flex-col gap-4 py-4 px-6 border border-black/10'>
      <p className='font-normal dark:!text-navy-200 uppercase'>
        {data.continent}
      </p>
      <div className='flex items-center gap-2'>
        <div className='filter-navy-400'>
          <IconLocation />
        </div>
        <h3 className='text-xl'>{data.country}</h3>
      </div>
      <p className='font-normal dark:!text-navy-200 text-base'>
        {data.location}
      </p>
    </div>
  );
};

ContactUsLocationCard.displayName = 'ContactUsLocationCard';

export default ContactUsLocationCard;
