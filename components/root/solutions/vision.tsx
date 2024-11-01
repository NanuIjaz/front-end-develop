// Type
import { TSolution } from '@/types/solution.type';

const SolutionsVision = ({ data }: { data: TSolution }) => {
  const { heading, description, items } = data.acf.vision;

  return (
    <section className='xl:container flex flex-col gap-14 py-20 dark:bg-navy-600 dark:xl:bg-navy-700 px-5 2xl:px-0'>
      <div className='flex flex-col items-center xl:items-start gap-5 w-full'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          SMARTBLOCKS VISION
        </p>
        <div className='flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-0 w-full'>
          <h2 className='xl:max-w-[450px] w-full text-center xl:text-left'>
            {heading}
          </h2>
          <p className='xl:max-w-[720px] dark:!text-navy-200 text-base font-normal w-full text-center xl:text-left'>
            {description}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-10'>
        {items.map((visionItem, index) => (
          <div
            className='flex flex-col justify-between border-b border-orange bg-navy-50 dark:bg-navy-500/10 p-10 h-[320px] xl:h-[229px] rounded-t-sm'
            key={visionItem.description}
          >
            <p className='dark:!text-navy-400 font-medium text-[46px] xl:text-[48px]'>
              0{index + 1}
            </p>
            <h4>{visionItem.description}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

SolutionsVision.displayName = 'SolutionsVision';

export default SolutionsVision;
