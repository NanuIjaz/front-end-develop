// Next
import dynamic from 'next/dynamic';

// Type
import { TContactUsPage } from '@/types/contact-us.type';

// Dynamic Components
const ContactUsLocationCard = dynamic(
  () => import('@/components/root/contact-us/location-card'),
);

const ContactUsLocation = ({ data }: { data: TContactUsPage }) => {
  return (
    <section className='dark:bg-[#01222D] xl:pt-20 2xl:pt-0'>
      <div className='xl:container !pb-20 flex flex-col gap-6 px-5 2xl:px-0 items-center xl:items-start'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          {data.global_company.title}
        </p>
        <div className='flex flex-col xl:flex-row justify-between items-center xl:items-center w-full gap-10 xl:gap-0'>
          <h2 className='text-center xl:text-left text-2xl xl:text-[36px] xl:max-w-2xl'>
            {data.global_company.heading}
          </h2>
          <div className='grid grid-cols-1 xl:gap-x-5 xl:gap-y-8 gap-6'>
            {data.global_company.items.map((location) => (
              <ContactUsLocationCard key={location.location} data={location} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

ContactUsLocation.displayName = 'ContactUsLocation';

export default ContactUsLocation;
