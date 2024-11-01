// Next
import Image from 'next/image';

// Type
import { THomeData } from '@/types/home.type';

// Image
import OurDirectionItem from '@/public/image/our-direction-item.png';

const HomeSolution = ({ data }: { data: THomeData }) => {
  const { heading, item } = data.solution_highlight;

  return (
    <section className='py-16 xl:py-24 dark:bg-navy-700'>
      <div className='xl:container flex flex-col gap-16 px-5 2xl:px-0'>
        <div className='flex flex-col items-center text-center gap-6'>
          <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest text-center'>
            SOLUTIONS HIGHLIGHT
          </p>
          <h2 className='leading-[39.6px] max-w-full xl:max-w-xl text-2xl xl:text-[32px]'>
            {heading}
          </h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-5 w-full'>
          {item.map((solution, index) => (
            <div
              className='bg-[#F8FAFA] dark:bg-navy-500/10 p-9 rounded-sm flex flex-col gap-7 border border-black/10 w-full min-h-[478px]'
              key={solution.title + index}
            >
              <div className='flex justify-between items-start'>
                <p className='label-s dark:!text-navy-400'>0{index + 1}</p>
                {solution.image.url ? (
                  <Image
                    src={solution.image.url}
                    alt='Our Direction Item'
                    quality={100}
                    priority
                    className='aspect-square min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] object-cover'
                    width={solution.image.width}
                    height={solution.image.height}
                    unoptimized
                  />
                ) : (
                  <Image
                    src={OurDirectionItem}
                    alt='Our Direction Item'
                    quality={100}
                    priority
                    className='aspect-square min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] object-cover'
                    width={220}
                    height={220}
                    unoptimized
                  />
                )}
              </div>
              <div className='flex flex-col flex-grow gap-4'>
                <h3 className='min-h-[65px]'>{solution.title}</h3>
                <p className='font-normal text-sm xl:text-base !text-navy-400 dark:!text-navy-200'>
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

HomeSolution.displayName = 'HomeSolution';

export default HomeSolution;
