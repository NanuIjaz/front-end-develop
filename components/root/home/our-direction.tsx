// Next
import Image from 'next/image';

// Type
import { THomeData } from '@/types/home.type';

const HomeOurDirection = ({
  data,
}: {
  data: Pick<THomeData, 'our_directions'>;
}) => {
  const { description, directions } = data.our_directions;

  return (
    <section className='py-9 xl:!py-20 bg-navy-50 dark:bg-navy-600'>
      <div className='xl:container flex flex-col gap-16 px-5 2xl:px-0'>
        <div className='flex flex-col items-center justify-center text-center gap-6'>
          <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
            OUR DIRECTION
          </p>
          <h2 className='leading-[39.6px] text-center text-2xl xl:text-[32px] text-wrap break-words max-w-full'>
            {description}
          </h2>
        </div>
        {directions.length >= 1 && (
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[repeat(auto-fit,_31%)] gap-y-10 gap-x-16 items-center justify-center'>
            {directions.map((direct) => (
              <div
                className='shadow-91 dark:shadow-none bg-white dark:bg-navy-500/10 p-6 rounded-xs flex flex-col gap-5 max-w-[417px] h-full hover:linear-our-direction dark:hover:bg-gradient-to-b dark:hover:from-navy-500/60 dark:hover:from-[25%] dark:hover:to-orange dark:transition-all dark:duration-300'
                key={direct.tittle}
              >
                <Image
                  src={direct.image.url}
                  alt='Our Direction Item'
                  quality={100}
                  priority
                  className='aspect-square'
                  width={111}
                  height={111}
                />
                <h4 className='font-medium'>{direct.tittle}</h4>
                <p className='body-m text-navy-400 dark:!text-navy-100'>
                  {direct.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

HomeOurDirection.displayName = 'HomeOurDirection';

export default HomeOurDirection;
