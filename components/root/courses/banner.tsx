'use client';

// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Type
import { TCourse } from '@/types/courses.type';

// Icon
import { ArrowRight } from 'lucide-react';

// Libs
import DayJS from '@/lib/day';

// Constants
import { COURSE_STATUSES } from '@/constants/course.constant';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

// Dynamic Icon
const IconLocation = dynamic(() => import('@/components/icon/location'));

const CoursesBanner = ({ data }: { data: TCourse }) => {
  const { image_hero, excerpt, brochure } = data.acf.hero;
  const { og_title } = data.yoast_head_json;
  const { date, onlineoffline } = data.acf.schedule_and_syllabus.schedule;
  const { main_syllabus } = data.acf.schedule_and_syllabus.syllabus;

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
    <section
      className='h-full min-h-screen pt-[91px] mb-28 xl:container'
      id='courses-detail-banner'
    >
      <div className='w-full grid grid-cols-1 xl:grid-cols-2 h-full overflow-hidden gap-10'>
        <div className='flex justify-end items-center px-5 2xl:px-0'>
          <div className='xl:w-[680px] pt-10'>
            <div className='flex flex-col items-center xl:items-start gap-8'>
              <p className='font-medium dark:text-navy-200 text-navy-400 uppercase text-xs text-center xl:text-left tracking-widest'>
                {data.acf.category[0].name}
              </p>
              <div className='flex flex-col gap-5'>
                <h1 className='text-center xl:text-left'>{og_title}</h1>
                {data.acf.course_status !== COURSE_STATUSES.COMING_SOON && (
                  <div className='flex justify-center xl:justify-start items-center gap-6'>
                    <div className='flex items-center justify-center xl:justify-start gap-2'>
                      <div className='filter-navy-700 dark:!filter-white'>
                        <IconLocation />
                      </div>
                      <p className='font-normal text-xs xl:text-base dark:!text-navy-200'>
                        {onlineoffline}
                      </p>
                    </div>
                    {date.start_date ? (
                      <p className='text-xs xl:text-base font-bold'>
                        {DayJS(date.start_date, 'DD/MM/YYYY').format(
                          'dddd, MMMM D YYYY',
                        )}{' '}
                        -{' '}
                        {DayJS(date.date_of_completion, 'DD/MM/YYYY').format(
                          'dddd, MMMM D YYYY',
                        )}
                      </p>
                    ) : (
                      <p className='text-xs xl:text-base font-bold'>
                        Course dates coming soon
                      </p>
                    )}
                  </div>
                )}
              </div>
              <p className='body-m text-navy-400 dark:text-navy-200 text-center xl:text-left'>
                {excerpt}
              </p>
              <div className='flex flex-col xl:flex-row items-center gap-7 w-full'>
                <Button
                  variant='white'
                  className='w-full xl:w-fit'
                  onClick={onMouseClick}
                >
                  {data.acf.course_status !== COURSE_STATUSES.COMING_SOON
                    ? 'Enroll Now'
                    : 'Join Waitlist'}
                </Button>
                {data.acf.course_status !== COURSE_STATUSES.COMING_SOON && (
                  <Link
                    href={brochure.url ?? '#'}
                    target='_blank'
                    className='w-full xl:w-fit'
                  >
                    <Button variant='link' className='w-full xl:w-fit' noArrow>
                      Download Brochure
                      <ArrowRight className='ml-2 w-3 h-3' />
                    </Button>
                  </Link>
                )}
              </div>
              {main_syllabus.length >= 1 &&
                data.acf.course_status !== COURSE_STATUSES.COMING_SOON && (
                  <div className='bg-navy-50 dark:bg-navy-500/20 border-none rounded-xs p-6 flex flex-col gap-4 w-full'>
                    <p className='text-base font-normal dark:!text-navy-200 uppercase mb-[2px]'>
                      Things you will learn in our course
                    </p>
                    {main_syllabus.slice(0, 3).map((syllabus) => (
                      <p
                        className='font-bold text-lg'
                        key={syllabus.tittle_main_syllabus}
                      >
                        {syllabus.tittle_main_syllabus}
                      </p>
                    ))}
                    {main_syllabus.length > 3 && (
                      <p className='text-lg font-bold dark:!text-navy-200'>
                        And more+
                      </p>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
        <Image
          src={image_hero.url}
          alt='E-Learning Image'
          quality={100}
          priority
          className='object-cover min-h-[calc(100vh-91px)] h-full w-full object-center'
          width={image_hero.width}
          height={image_hero.height}
        />
      </div>
    </section>
  );
};

CoursesBanner.displayName = 'CoursesBanner';

export default CoursesBanner;
