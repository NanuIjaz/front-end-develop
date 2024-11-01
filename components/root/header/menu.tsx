// React
import { useEffect, useState, useCallback } from 'react';

// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';

// Icon
import { ChevronDown, Loader2 } from 'lucide-react';

// Libs
import { cn } from '@/lib/utils';

// Types
import { TGeneralHeaders } from '@/types/general.type';
import { TCourse, TCourseCategory } from '@/types/courses.type';

// Api
import { fetchCoursesByCategory, fetchAllCourse } from '@/api/courses.api';

// Image
import Globe from '@/public/image/globe.png';
import MenuChildItems from '@/public/image/menu-child-items.png';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const HeaderMenu = ({
  headers,
  courseCategories,
  isNavActive,
  setIsOpen,
}: {
  headers: TGeneralHeaders;
  courseCategories: TCourseCategory[];
  isNavActive: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  // Hooks
  const { push } = useRouter();
  const pathName = usePathname();
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<TCourseCategory>();

  /**
   * @description fetch course by category id
   *
   * @return {Promise<void>}
   */
  const fetchCourses = useCallback(
    async (category: TCourseCategory, withPush?: boolean) => {
      setLoading(true);
      setCourses([]);

      try {
        let response;

        if (category.slug === '/') {
          response = await fetchAllCourse({
            categories: undefined,
          });
        } else {
          response = await fetchCoursesByCategory({
            categories: category.slug,
          });

          if (withPush) {
            push(`?activeCourses=true&courseCategory=${category.slug}`);
          }
        }

        setCourses(response);
      } catch (_) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    },
    [push],
  );

  /**
   * @description handle smooth scroll to About Us section
   */
  const handleAboutUsClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    push('/');

    setTimeout(() => {
      const aboutUsSection = document.getElementById('about-us');
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  /**
   * @description handle click courses menu
   *
   * @return {any}
   */
  const handleClickCourses = useCallback(
    (url: string) => {
      return url === '/courses'
        ? `?activeCourses=true&courseCategory=${courseCategories[0].slug}`
        : url;
    },
    [courseCategories],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setActiveSubMenu(courseCategories[0]);
    fetchCourses(courseCategories[0]);
  }, []);

  return (
    <>
      <div className={cn('gap-8 hidden xl:flex', isNavActive && '!hidden')}>
        {headers.menus.map((menu) => (
          <div
            key={menu.menu_name}
            className='w-fit bg-white dark:bg-navy-700 transition-all duration-300 group'
          >
            <Link
              href={
                menu.menu_url?.url === '/about-us'
                  ? '/'
                  : handleClickCourses(menu.menu_url?.url ?? '#')
              }
              onClick={
                menu.menu_url?.url === '/about-us'
                  ? handleAboutUsClick
                  : () => setIsOpen(false)
              }
              className={cn(
                'flex h-full w-fit items-center justify-center bg-white dark:bg-navy-700 text-base py-8 text-nowrap font-normal opacity-50 hover:font-medium hover:opacity-100',
                pathName === '/' && menu?.menu_url?.url === '/'
                  ? 'font-medium opacity-100'
                  : pathName.includes(menu.menu_url?.url) &&
                      menu?.menu_url?.url !== '/' &&
                      'font-medium opacity-100',
              )}
            >
              {menu.menu_name}
              {menu.menu_name.toLowerCase().includes('course') && (
                <ChevronDown className='h-3 w-3 shrink-0 transition-transform duration-200 ml-2 group-hover:rotate-180' />
              )}
            </Link>

            {(pathName === '/' && menu?.menu_url?.url === '/') ||
            (pathName.includes(menu.menu_url?.url) &&
              menu?.menu_url?.url !== '/') ? (
              <div className='h-0.5 relative [background:linear-gradient(220.57deg,_#ff1055,_#ffd363)]' />
            ) : (
              <div className='h-0.5 relative [background:linear-gradient(220.57deg,_#ff1055,_#ffd363)] hidden' />
            )}

            {menu.menu_name.toLowerCase().includes('course') && (
              <div className='min-h-80 container bg-navy-50 dark:bg-[#01222D] absolute hidden group-hover:grid left-0 right-0 border-black/10 shadow-32 rounded-b-lg transition-all duration-300 !pl-6 !pb-3 !pr-3 grid-cols-6 z-[99]'>
                <div className='col-span-2 flex flex-col pt-6 gap-1'>
                  {courseCategories
                    .filter((category) => category.name !== 'All Courses')
                    .slice(0, 4)
                    .map((categories) => {
                      const active = activeSubMenu?.slug === categories.slug;

                      return (
                        <div
                          className={cn(
                            'w-full flex flex-col gap-4 p-4 hover:bg-white dark:hover:bg-navy-700 hover:rounded-l-[8px] transition-all duration-300 relative',
                            active &&
                              'bg-white dark:bg-navy-700 rounded-l-[8px]',
                          )}
                          key={categories.id}
                          onClick={() => {
                            setActiveSubMenu(categories);
                            fetchCourses(categories, true);
                          }}
                        >
                          <h4>{categories.name}</h4>
                          <p className='body-m text-navy-700'>
                            {categories.description}
                          </p>
                          {active && (
                            <div className='w-0.5 h-full absolute [background:linear-gradient(220.57deg,_#ff1055,_#ffd363)] right-0 top-0 bottom-0'></div>
                          )}
                        </div>
                      );
                    })}
                </div>
                {loading ? (
                  <div className='flex h-full w-full items-center justify-center bg-navy-50 dark:bg-navy-700 rounded-b-[26px] p-4 col-span-4'>
                    <Loader2 className='animate-spin w-10 h-10 text-navy-700 dark:text-white' />
                  </div>
                ) : (
                  <div className='col-span-4 bg-white dark:bg-navy-700 rounded-b-[26px] p-4'>
                    {activeSubMenu?.id === 244 ? (
                      <div className='flex flex-col gap-3'>
                        <Image
                          src={Globe}
                          priority
                          alt='Globe Image'
                          width={125}
                          height={125}
                          className='aspect-square'
                        />
                        <hr className='dark:!border-white/10' />
                        <div className='flex flex-col gap-6'>
                          <h3 className='font-medium'>E - Learning</h3>
                          <p className='body-m text-navy dark:!text-navy-200 font-normal text-base'>
                            Gain exclusive access to a curated collection of
                            blockchain education content to structure and plan
                            your self-study program according to your
                            educational needs
                          </p>
                          <Link href='/e-learning'>
                            <Button variant='white'>Learn More</Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className='grid grid-cols-2 gap-6 items-start h-fit'>
                        {courses.map((course) => (
                          <a
                            className='p-4 flex items-center gap-4 hover:bg-white group/item min-h-[118px] duration-300 transition-all'
                            key={course.id}
                            href={`/courses/${course.slug}`}
                          >
                            <Image
                              src={MenuChildItems}
                              alt='Menu Child Items'
                              priority
                              quality={100}
                              width={60}
                              height={60}
                            />
                            <div className='flex flex-col gap-4'>
                              <h4
                                className='group-hover/item:text-navy-700 duration-300 transition-all'
                                dangerouslySetInnerHTML={{
                                  __html:
                                    course.title.rendered ??
                                    course.yoast_head_json.og_title,
                                }}
                              ></h4>
                              <p className='font-normal group-hover/item:text-navy-400 duration-300 transition-all line-clamp-2'>
                                {course.acf.about_course.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

HeaderMenu.displayName = 'HeaderMenu';

export default HeaderMenu;
