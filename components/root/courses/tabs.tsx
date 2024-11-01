'use client';

// Constants
import { COURSES_DETAIL_MENUS } from '@/constants/course.constant';

// Libs
import { cn } from '@/lib/utils';

// Type
import { TCourse } from '@/types/courses.type';

const CoursesTabs = ({
  activeMenu,
  data,
  setActiveMenu,
}: {
  activeMenu: string;
  data: TCourse;
  setActiveMenu: (x: string) => void;
}) => {
  const hasData = (key: string) => {
    switch (key) {
      case 'about_course':
        return (
          !!data.acf.about_course.description || !!data.acf.about_course.title
        );
      case 'graduate':
        return data.acf.graduate.length >= 1;
      case 'schedule_and_syllabus':
        return (
          !!data.acf.schedule_and_syllabus.schedule.description_schedule ||
          !!data.acf.schedule_and_syllabus.syllabus.description_syllabus
        );
      case 'benefits_and_requirements':
        return (
          !!data.acf.benefits_and_requirements.benefit.benefit_1.heading ||
          !!data.acf.benefits_and_requirements.benefit.benefit_2.heading ||
          !!data.acf.benefits_and_requirements.benefit.benefit_3.heading ||
          !!data.acf.benefits_and_requirements.benefit.benefit_4.heading
        );
      case 'course_fee':
        return (
          !!data.acf.course_fee.installment.fee ||
          !!data.acf.course_fee.onetap.fee
        );
      default:
        return false;
    }
  };

  const filteredMenus = COURSES_DETAIL_MENUS.filter((menu) =>
    hasData(menu.key),
  );

  return (
    <div className='flex items-center max-w-full xl:max-w-xl overflow-x-auto'>
      {filteredMenus.map((menu) => {
        const selectedMenu = menu.key === activeMenu;

        return (
          <div
            className='bg-white dark:bg-navy-700 transition-all duration-300 group px-4 cursor-pointer'
            key={menu.id}
            onClick={() => setActiveMenu(menu.key)}
          >
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-white dark:bg-navy-700 py-8 text-base text-nowrap font-normal opacity-50 hover:font-medium hover:opacity-100 capitalize',
                selectedMenu && 'opacity-100 font-medium',
              )}
            >
              {menu.title}
            </div>

            {selectedMenu && (
              <div className='h-0.5 relative [background:linear-gradient(220.57deg,_#ff1055,_#ffd363)]' />
            )}
          </div>
        );
      })}
    </div>
  );
};

CoursesTabs.displayName = 'CoursesTabs';

export default CoursesTabs;
