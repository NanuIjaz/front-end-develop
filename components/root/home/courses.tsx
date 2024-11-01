// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Type
import { TCourse, TCourseCategory } from '@/types/courses.type';

// Dynamic Component
const HomeCourseCard = dynamic(
  () => import('@/components/root/home/courses/card'),
);
const HomeCourseTabs = dynamic(
  () => import('@/components/root/home/courses/tabs'),
);
const HomeCoursesPagination = dynamic(
  () => import('@/components/root/home/courses/pagination'),
);
const HomeCoursesSearch = dynamic(
  () => import('@/components/root/home/courses/search'),
);
const HomeCourseShowAll = dynamic(
  () => import('@/components/root/home/courses/show-all'),
);

const HomeCourses = ({
  categories,
  activeCategory,
  courses,
  maxItems,
  description,
}: {
  categories: TCourseCategory[];
  activeCategory: string;
  courses: TCourse[];
  maxItems: string;
  description: string;
}) => {
  let displayedCourses = courses;

  if (activeCategory === '/' && maxItems === '9') {
    displayedCourses = courses.slice(0, 2);
  }

  return (
    <section
      className='xl:container flex flex-col gap-6 xl:gap-16 mt-24 px-5 2xl:px-0'
      id='home-courses'
    >
      <div className='flex flex-col gap-6'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          COURSES
        </p>
        <h2>{description}</h2>
      </div>
      <div className='flex flex-col xl:flex-row items-center justify-between border-b !border-[#0029361A] dark:border-white/10 w-full'>
        <HomeCourseTabs categories={categories} courseSlug={activeCategory} />

        <HomeCoursesSearch />
      </div>
      <div className='grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center w-full -mt-5 gap-x-4 gap-y-10 hidden xl:grid'>
        {courses.length >= 1 ? (
          courses.map((course) => (
            <HomeCourseCard data={course} key={course.id} />
          ))
        ) : (
          <div className='flex items-center justify-center flex-col gap-4 w-full lg:col-span-2 xl:col-span-3'>
            <Image
              src='https://emurgo-api.antigravity.dev/wp-content/uploads/2024/08/empty-course.png'
              alt='Empty Course'
              priority
              width={150}
              height={150}
              unoptimized
              className='aspect-square object-cover object-center'
            />
            <h3 className='font-normal dark:!text-navy-200 text-center'>
              No course is available at the moment
            </h3>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center w-full gap-x-4 gap-y-10 xl:hidden'>
        {displayedCourses.length >= 1 ? (
          displayedCourses.map((course) => (
            <HomeCourseCard data={course} key={course.id} />
          ))
        ) : (
          <div className='flex items-center justify-center flex-col gap-4 w-full lg:col-span-2 xl:col-span-3'>
            <Image
              src='https://emurgo-api.antigravity.dev/wp-content/uploads/2024/08/empty-course.png'
              alt='Empty Course'
              priority
              width={150}
              height={150}
              unoptimized
              className='aspect-square object-cover object-center'
            />
            <h3 className='font-normal dark:!text-navy-200 text-center'>
              No course is available at the moment
            </h3>
          </div>
        )}
      </div>
      {activeCategory === '/' && maxItems !== '999' && (
        <HomeCourseShowAll maxItems={maxItems} />
      )}
      {courses.length > 9 && <HomeCoursesPagination maxItems={maxItems} />}
    </section>
  );
};

HomeCourses.displayName = 'HomeCourses';

export default HomeCourses;
