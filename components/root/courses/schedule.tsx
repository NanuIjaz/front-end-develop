'use client';

// Next
import dynamic from 'next/dynamic';

// Type
import { TCourse } from '@/types/courses.type';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const CoursesSchedule = ({ data }: { data: TCourse }) => {
  const { description_schedule, onlineoffline } =
    data.acf.schedule_and_syllabus.schedule;

  /**
   * @description handle smooth scroll to Enroll Form section
   */
  const onMouseClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const enrollSection = document.getElementById('enroll');

    if (enrollSection) {
      enrollSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='flex flex-col gap-6' id='schedule_and_syllabus'>
      <p className='font-medium dark:!text-navy-200 text-navy-400 uppercase text-xs'>
        SCHEDULE
      </p>
      <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-5'>
        <div className='flex flex-col gap-8 xl:max-w-[393px]'>
          <h2 className='text-2xl text-[32px]'>Course schedule</h2>
          <p className='font-normal text-sm xl:text-base dark:!text-navy-200 whitespace-pre-line'>
            {description_schedule}
          </p>
        </div>
        <div className='rounded-[8px] p-4 flex flex-col gap-6 bg-navy-500/10 w-full xl:w-fit'>
          <div className='flex items-center justify-between'>
            <h5>{onlineoffline}</h5>
            <p className='text-base font-normal dark:!text-navy-200'>Online</p>
          </div>
          <p className='text-base font-medium'>Course dates coming soon</p>
          <Button variant='white' className='w-fit' onClick={onMouseClick}>
            Enroll Now
          </Button>
        </div>
      </div>
    </section>
  );
};

CoursesSchedule.displayName = 'CoursesSchedule';

export default CoursesSchedule;
