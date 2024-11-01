// Next
import dynamic from 'next/dynamic';

// Type
import { TSolution } from '@/types/solution.type';

// Dynamic Components
const ContactUsForm = dynamic(
  () => import('@/components/root/contact-us/form'),
);

const SolutionsJoinUs = ({ data }: { data: TSolution }) => {
  const { heading, description } = data.acf.contact_us;

  return (
    <section
      className='grid grid-cols-1 xl:grid-cols-2 xl:container gap-10 xl:gap-[84px] pt-16 xl:pt-44 px-5 2xl:px-0'
      id='solution-join-us'
    >
      <div className='flex flex-col items-center xl:items-start gap-8'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest text-center xl:text-left'>
          Contact us
        </p>
        <div className='flex flex-col gap-6'>
          <h1 className='text-center xl:text-left max-w-[504px]'>{heading}</h1>
          <p className='font-normal text-sm xl:text-base dark:!text-navy-200 max-w-[558px] text-center xl:text-left'>
            {description}
          </p>
        </div>
      </div>
      <ContactUsForm />
    </section>
  );
};

SolutionsJoinUs.displayName = 'SolutionsJoinUs';

export default SolutionsJoinUs;
