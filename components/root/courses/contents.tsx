'use client';

// React
import { useState, useEffect } from 'react';

// Next
import dynamic from 'next/dynamic';

// Type
import { TCourse, TCourseFee } from '@/types/courses.type';

// Dynamic Components
const CoursesMenus = dynamic(() => import('@/components/root/courses/menus'));
const CoursesTabs = dynamic(() => import('@/components/root/courses/tabs'));
const CoursesAbout = dynamic(() => import('@/components/root/courses/about'));
const CoursesGraduates = dynamic(
  () => import('@/components/root/courses/graduates'),
);
const CoursesSchedule = dynamic(
  () => import('@/components/root/courses/schedule'),
);
const CoursesSyllabus = dynamic(
  () => import('@/components/root/courses/syllabus'),
);
const CoursesRequirement = dynamic(
  () => import('@/components/root/courses/requirement'),
);
const CoursesFee = dynamic(() => import('@/components/root/courses/fee'));

const CoursesContents = ({
  data,
  courseFee,
}: {
  data: TCourse;
  courseFee: TCourseFee;
}) => {
  const [activeMenu, setActiveMenu] = useState<string>('about_course');

  const handleScroll = () => {
    if (window.innerWidth >= 1280) {
      const sections = [
        {
          id: 'about_course',
          element: document.getElementById('about_course'),
        },
        { id: 'graduate', element: document.getElementById('graduate') },
        {
          id: 'schedule_and_syllabus',
          element: document.getElementById('schedule_and_syllabus'),
        },
        {
          id: 'benefits_and_requirements',
          element: document.getElementById('benefits_and_requirements'),
        },
        { id: 'course_fee', element: document.getElementById('course_fee') },
      ];

      const scrolledSection = sections.find((section) => {
        const rect = section.element?.getBoundingClientRect();
        return rect && rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });

      if (scrolledSection && scrolledSection.id !== activeMenu) {
        setActiveMenu(scrolledSection.id);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        window.addEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu]);

  return (
    <>
      <section className='grid-cols-6 container gap-14 h-fit hidden xl:grid'>
        <div className='col-span-2 sticky top-5 h-fit'>
          <CoursesMenus
            data={data}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className='col-span-4 flex flex-col gap-20'>
          <CoursesAbout data={data} />
          {data.acf.graduate.length >= 1 && <CoursesGraduates data={data} />}
          <CoursesSchedule data={data} />
          <CoursesSyllabus data={data} />
          <CoursesRequirement data={data} />
          <CoursesFee data={data} courseFee={courseFee} />
        </div>
      </section>
      <section className='flex-col gap-8 px-5 2xl:px-0 flex xl:hidden'>
        <h2 className='text-2xl xl:text-[32px]'>
          {data.yoast_head_json.og_title}
        </h2>
        <CoursesTabs
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          data={data}
        />
        <div>
          {activeMenu === 'about_course' && <CoursesAbout data={data} />}
          {activeMenu === 'graduate' && <CoursesGraduates data={data} />}
          {activeMenu === 'schedule_and_syllabus' && (
            <div className='flex flex-col gap-20'>
              <CoursesSchedule data={data} />
              <CoursesSyllabus data={data} />
            </div>
          )}
          {activeMenu === 'benefits_and_requirements' && (
            <div>
              <CoursesRequirement data={data} />
            </div>
          )}
          {activeMenu === 'course_fee' && (
            <CoursesFee data={data} courseFee={courseFee} />
          )}
        </div>
      </section>
    </>
  );
};

CoursesContents.displayName = 'CoursesContents';

export default CoursesContents;
