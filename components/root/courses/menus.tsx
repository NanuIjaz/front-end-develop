'use client';

// Next
import dynamic from 'next/dynamic';

// Constants
import { COURSES_DETAIL_MENUS } from '@/constants/course.constant';

// Type
import { TCourse } from '@/types/courses.type';

// Libs
import { cn } from '@/lib/utils';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const CoursesMenus = ({
  data,
  activeMenu,
  setActiveMenu,
}: {
  data: TCourse;
  activeMenu: string;
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

  /**
   * @description handle smooth scroll to About Us section
   */
  const onClickMenu = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    menu: { id: number; key: string },
  ) => {
    setActiveMenu(menu.key);

    setTimeout(() => {
      e.preventDefault();
      const anchorSection = document.getElementById(menu.key);

      if (anchorSection) {
        const rect = anchorSection.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const offset = window.innerHeight / 2 - rect.height / 2;

        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth',
        });
      }
    }, 200);
  };

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
    <section className='rounded-xs px-5 py-8 flex flex-col gap-10 dark:bg-[#0A313E] relative border dark:border-none'>
      <h2>{data.yoast_head_json.og_title}</h2>
      <div className='flex flex-col'>
        {filteredMenus.map((menu) => {
          const selectedMenu = menu.key === activeMenu;

          return (
            <div
              key={menu.id}
              className='flex cursor-pointer'
              onClick={(e) => onClickMenu(e, menu)}
            >
              <p
                className={cn(
                  'dark:!text-navy-200 font-medium text-xl py-3',
                  selectedMenu && 'dark:!text-white font-bold',
                )}
              >
                {menu.title}
              </p>

              {selectedMenu && (
                <div className='w-0.5 h-[50px] absolute [background:linear-gradient(220.57deg,_#ff1055,_#ffd363)] right-0' />
              )}
            </div>
          );
        })}
      </div>
      <Button variant='white' className='w-fit' onClick={onMouseClick}>
        Enroll Now
      </Button>
    </section>
  );
};

CoursesMenus.displayName = 'CoursesMenus';

export default CoursesMenus;
