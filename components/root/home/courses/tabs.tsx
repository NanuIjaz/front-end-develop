'use client';

// Next
import { useRouter } from 'next/navigation';

// Type
import { TCourseCategory } from '@/types/courses.type';

// Libs
import { cn } from '@/lib/utils';

const HomeCourseTabs = ({
  categories,
  courseSlug = '/',
}: {
  categories: TCourseCategory[];
  courseSlug?: string;
}) => {
  // Hooks
  const { push } = useRouter();

  // Add All Course
  const courseCategories = categories;
  const allCourseExists = courseCategories.some(
    (category) => category.id === 1,
  );

  if (!allCourseExists) {
    courseCategories.unshift({
      ...categories[0],
      id: 1,
      name: 'All Courses',
      slug: '/',
    });
  }

  return (
    <div className='flex items-center max-w-full xl:max-w-xl overflow-x-auto order-2 xl:order-1'>
      {courseCategories.map((category) => {
        const activeTab = courseSlug === category.slug;

        return (
          <div
            className='bg-white dark:bg-navy-700 transition-all duration-300 group px-4 cursor-pointer'
            key={category.id}
            onClick={() =>
              push(`?activeCourses=true&courseCategory=${category.slug}`, {
                scroll: false,
              })
            }
          >
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-white dark:bg-navy-700 py-8 text-xl text-nowrap opacity-50 !font-normal dark:!text-[#CCD4D7] hover:!font-medium capitalize',
                activeTab && '!font-medium dark:!text-[#CCD4D7] opacity-100',
              )}
            >
              {category.name}
            </div>

            {activeTab && (
              <div className='h-0.5 relative [background:linear-gradient(220.57deg,_#ff1055,_#ffd363)]' />
            )}
          </div>
        );
      })}
    </div>
  );
};

HomeCourseTabs.displayName = 'HomeCourseTabs';

export default HomeCourseTabs;
