// Type
import { TSolution } from '@/types/solution.type';

const SolutionsIntroduction = ({ data }: { data: TSolution }) => {
  const { heading, video_url } = data.acf.introduction_video;

  return (
    <section className='relative pt-16 xl:pt-36 px-5 2xl:px-0'>
      <div className='xl:min-h-[500px] dark:bg-navy-700 flex flex-col items-center gap-7 mb-9 xl:mb-0'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          Introduction video
        </p>
        <h2 className='text-center xl:text-left text-2xl xl:text-[32px]'>
          {heading}
        </h2>
      </div>
      <div className='relative w-full pb-[56.25%] lg:pb-[100%] xl:w-1/2 xl:pb-[56.25%] 2xl:w-[50%] 2xl:pb-[56.25%] xl:absolute xl:left-[25%] 2xl:left-[24.9%] xl:top-[50%] 2xl:top-[40%]'>
        <video
          controls
          preload='none'
          aria-label='Video player'
          className='absolute inset-0 w-full h-full max-h-[517px] border-b-[5px] border-orange rounded-xs'
        >
          <source src={video_url.url} type={video_url.mime_type} />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='min-h-80 dark:bg-[#01222D] hidden xl:block'></div>
    </section>
  );
};

SolutionsIntroduction.displayName = 'SolutionsIntroduction';

export default SolutionsIntroduction;
