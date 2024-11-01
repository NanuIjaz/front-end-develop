// Next
import Image from 'next/image';

// Type
import { TSolution } from '@/types/solution.type';

const SolutionsOurPartner = ({ data }: { data: TSolution }) => {
  const { heading, logo_partner } = data.acf.our_partner;

  return (
    <section className='mt-16 xl:mt-36 px-5 2xl:px-0'>
      <div className='flex flex-col gap-6 w-full items-center'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          OUR PARTNERS
        </p>
        <h2 className='text-2xl xl:text-[32px] text-center xl:text-left'>
          {heading}
        </h2>
        <div className='flex items-center gap-6 flex-wrap justify-center mt-8 relative w-full'>
          <div className='absolute w-[317px] h-full left-0 !bg-gradient-to-r from-white dark:from-navy-700 from-10% !to-transparent z-50 hidden xl:block'></div>
          {logo_partner.map((partner) => (
            <Image
              src={partner.image.url}
              alt='Logo Partner'
              quality={100}
              priority
              width={partner.image.width}
              height={partner.image.height}
              className='aspect-auto bg-transparent max-h-[58px] xl:max-h-none max-w-full xl:w-[250px] object-contain'
              key={partner.image.id}
            />
          ))}
          <div className='absolute w-[317px] h-full right-0 !bg-gradient-to-l from-white dark:from-navy-700 from-10% !to-transparent z-50 hidden xl:block'></div>
        </div>
      </div>
    </section>
  );
};

SolutionsOurPartner.displayName = 'SolutionsOurPartner';

export default SolutionsOurPartner;
