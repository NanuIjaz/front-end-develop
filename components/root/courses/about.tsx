// Type
import { TCourse } from '@/types/courses.type';

// Util
import { cn } from '@/lib/utils';

const CoursesAbout = ({ data }: { data: TCourse }) => {
  const { title, description, video_overview } = data.acf.about_course;

  return (
    <section
      className='grid grid-cols-1 xl:grid-cols-7 gap-8'
      id='about_course'
    >
      <div
        className={cn(
          'flex flex-col items-center xl:items-start gap-6',
          video_overview ? 'col-span-3' : 'col-span-7',
        )}
      >
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          Overview
        </p>
        <h2 className='text-center xl:text-left text-2xl xl:text-[32px]'>
          {title}
        </h2>
        <p className='font-normal whitespace-pre-line dark:!text-navy-200 text-sm xl:text-base text-center xl:text-left'>
          {description}
        </p>
      </div>
      {video_overview && (
        <video
          controls
          preload='none'
          aria-label='Video player'
          className='col-span-4 w-full h-[296px] rounded-xs shadow-47'
        >
          <source src={video_overview} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )}
    </section>
  );
};

CoursesAbout.displayName = 'CoursesAbout';

export default CoursesAbout;
