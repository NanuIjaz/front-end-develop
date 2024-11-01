// Next
import Image from 'next/image';

// Type
import { TSolution } from '@/types/solution.type';

// Util
import { cn } from '@/lib/utils';

const SolutionKeyFeature = ({ data }: { data: TSolution }) => {
  const { heading, items } = data.acf.key_features;

  return (
    <section
      className={cn(
        'bg-navy-50 dark:bg-[#01222D] py-32 xl:py-44',
        data.acf.introduction_video.video_url ? '-mt-20' : 'mt-20',
      )}
    >
      <div className='xl:container flex flex-col gap-6 xl:gap-32 px-5 2xl:px-0'>
        <div className='flex flex-col gap-6 items-center'>
          <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
            KEY FEATURES
          </p>
          <h2 className='text-center xl:text-left text-2xl xl:text-[32px]'>
            {heading}
          </h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-5 items-center justify-center w-full'>
          {items.map((features) => (
            <div
              className='bg-white dark:bg-navy-500/10 p-6 rounded-xs flex flex-col justify-between gap-5 w-full h-full hover:linear-our-direction dark:hover:bg-gradient-to-b dark:hover:from-navy-500/60 dark:hover:from-[25%] dark:hover:to-orange dark:transition-all dark:duration-300 hover:shadow-91'
              key={features.heading}
            >
              {features.image.url ? (
                <Image
                  src={features.image.url}
                  alt='Key Features Image'
                  quality={100}
                  priority
                  width={189}
                  height={189}
                  unoptimized
                  className='object-cover object-center max-w-[109px] max-h-[109px] aspect-square'
                />
              ) : (
                <div className='w-[189px] h-[189px]'></div>
              )}
              <div className='flex flex-col flex-grow gap-4'>
                <h4 className='min-h-[65px]'>{features.heading}</h4>
                <p className='font-normal text-sm xl:text-base dark:!text-navy-200'>
                  {features.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

SolutionKeyFeature.displayName = 'SolutionKeyFeature';

export default SolutionKeyFeature;
