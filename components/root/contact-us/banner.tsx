// Next
import dynamic from 'next/dynamic';

// Type
import { TContactUsPage } from '@/types/contact-us.type';

const ContactUsForm = dynamic(
  () => import('@/components/root/contact-us/form'),
);

const ContactUsBanner = ({ data }: { data: TContactUsPage }) => {
  return (
    <section
      className='h-fit xl:min-h-screen xl:h-full 2xl:h-screen px-5 2xl:px-0 py-16 xl:py-0 xl:pt-[91px] dark:bg-[#01222D]'
      id='contact-us-banner'
    >
      <div className='xl:container flex flex-col xl:flex-row items-center justify-between z-10 h-full gap-10 xl:gap-20'>
        <div className='flex flex-col items-center xl:items-start gap-5 max-w-xl'>
          <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
            Contact us
          </p>
          <h1 className='text-center xl:text-left' key={data.hero.heading}>
            {data.hero.heading}
          </h1>
          <p
            className='body-m mt-5 dark:text-navy-200 text-navy-700 text-center xl:text-left whitespace-pre-line'
            key={data.hero.description}
          >
            {data.hero.description}
          </p>
        </div>
        <ContactUsForm />
      </div>
    </section>
  );
};

ContactUsBanner.displayName = 'ContactUsBanner';

export default ContactUsBanner;
