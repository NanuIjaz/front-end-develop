// Next
import dynamic from 'next/dynamic';

// Type
import { TCourse } from '@/types/courses.type';

// Dynamic Components
const CoursesCarouselGraduates = dynamic(
  () => import('@/components/root/courses/carousel/graduates-carousel'),
);

const CoursesGraduates = ({ data }: { data: TCourse }) => {
  return (
    <section className='flex flex-col gap-9' id='graduate'>
      <div className='flex flex-col gap-7'>
        <p className='font-medium dark:!text-navy-200 text-navy-400 uppercase text-xs text-center xl:text-left'>
          GRADUATES
        </p>
        <h2 className='text-center xl:text-left text-2xl xl:text-[32px]'>
          Meet our graduates
        </h2>
      </div>
      <CoursesCarouselGraduates items={data.acf.graduate} />
    </section>
  );
};

CoursesGraduates.displayName = 'CoursesGraduates';

export default CoursesGraduates;
