// Next
import Image from 'next/image';

// Type
import { TSolution } from '@/types/solution.type';

const SolutionAmbassadors = ({ data }: { data: TSolution }) => {
  const { heading, title, description, image } = data.acf.highlight_ambasador;

  return (
    <section className='xl:container flex flex-col gap-10 items-center pt-16 xl:pt-24 px-5 2xl:px-0'>
      <div className='flex flex-col gap-7 items-center max-w-[930px]'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          {heading}
        </p>
        <h2 className='text-center xl:text-left text-2xl xl:text-[32px]'>
          {title}
        </h2>
      </div>
      <p className='font-normal text-base dark:!text-navy-200 text-center max-w-[930px]'>
        {description}
      </p>
      {image.url && (
        <Image
          src={image.url}
          alt='Image Ambassadors'
          priority
          quality={100}
          width={image.width}
          height={image.height}
          className='mt-8 object-cover object-center max-w-[642px]'
        />
      )}
    </section>
  );
};

SolutionAmbassadors.displayName = 'SolutionAmbassadors';

export default SolutionAmbassadors;
