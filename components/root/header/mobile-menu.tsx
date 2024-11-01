// React
import { useCallback } from 'react';

// Icon
import { ChevronDown } from 'lucide-react';

// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Util
import { cn } from '@/lib/utils';

// Types
import { TGeneralHeaders } from '@/types/general.type';
import { TCourseCategory, TCourse } from '@/types/courses.type';

// Image
import Globe from '@/public/image/globe.png';
import MenuChildItems from '@/public/image/menu-child-items.png';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);
const Accordion = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.Accordion,
  ),
);
const AccordionContent = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.AccordionContent,
  ),
);
const AccordionItem = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.AccordionItem,
  ),
);
const AccordionTrigger = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.AccordionTrigger,
  ),
);
const HomeCourseTabs = dynamic(
  () => import('@/components/root/home/courses/tabs'),
);

const HeaderMobileMenu = ({
  headers,
  courseCategories,
  isNavActive,
  isOpen,
  setIsOpen,
  courses,
  setIsCourse,
}: {
  headers: TGeneralHeaders;
  courseCategories: TCourseCategory[];
  isNavActive: boolean;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  courses: TCourse[];
  setIsCourse: (val: boolean) => void;
}) => {
  // Hooks
  // Hooks
  const { push } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const courseCategory = searchParams.get('courseCategory');

  /**
   * @description handle toggle open select option menu (mobile)
   */
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
   * @description handle select option menu click (mobile)
   */
  const handleMenuClick = (url: string) => {
    if (url === '/about-us') {
      handleAboutUsClick;
    } else {
      setIsOpen(false);
      push(
        url === '/courses'
          ? `?activeCourses=true&courseCategory=${courseCategories[0].slug}`
          : url,
      );
    }
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

  return (
    <>
      {!isNavActive && (
        <>
          <div className='relative mt-[30px] w-full z-[99] block xl:hidden px-5 2xl:px-0'>
            {headers.menus.length >= 1 && (
              <>
                <button
                  className={cn(
                    'w-full h-[56px] p-4 bg-white dark:bg-navy-700 xl:hidden border border-navy-700 dark:border-white/10 text-left flex items-center justify-between z-20',
                    isOpen ? 'rounded-t-xs' : 'rounded-xs',
                  )}
                  onClick={handleToggle}
                >
                  {
                    headers.menus.find(
                      (menu) =>
                        (pathName === '/' && menu?.menu_url?.url === '/') ||
                        (pathName.includes(menu.menu_url?.url) &&
                          menu?.menu_url?.url !== '/'),
                    )?.menu_name
                  }
                  <ChevronDown />
                </button>
                {isOpen && (
                  <div className='absolute bg-white dark:bg-navy-700 border border-navy-700 dark:border-white/10 rounded-b-xs z-10 left-5 right-5'>
                    {headers.menus.map((menu) => (
                      <div
                        key={menu.menu_name}
                        className={`p-4 border-b border-navy-700 dark:border-white/10 ${
                          (pathName === '/' && menu?.menu_url?.url === '/') ||
                          (pathName.includes(menu.menu_url?.url) &&
                            menu?.menu_url?.url !== '/')
                            ? 'bg-white !text-navy-700'
                            : ''
                        }`}
                        onClick={() => handleMenuClick(menu.menu_url?.url)}
                      >
                        <Link
                          href={
                            menu.menu_url?.url === '/about-us'
                              ? '/'
                              : handleClickCourses(menu.menu_url?.url)
                          }
                          onClick={
                            menu.menu_url?.url === '/about-us'
                              ? handleAboutUsClick
                              : undefined
                          }
                        >
                          {menu.menu_name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          {searchParams.get('activeCourses') && (
            <div className='block xl:hidden z-50'>
              <Accordion
                type='single'
                collapsible
                defaultValue='See Courses'
                className='z-5 mt-7'
                onValueChange={(value) => setIsCourse(value === 'See Courses')}
              >
                <AccordionItem
                  key='See Courses'
                  value='See Courses'
                  className='dark:bg-navy-700 border-none z-50'
                >
                  <AccordionTrigger svgClassName='h-5 w-5' className='p-3'>
                    See Courses
                  </AccordionTrigger>
                  <hr className='border border-white/10' />
                  <AccordionContent className='min-h-screen z-50 max-h-screen overflow-scroll'>
                    <HomeCourseTabs
                      categories={courseCategories}
                      courseSlug={courseCategory ?? '/'}
                    />
                    <div className='max-h-[400px] overflow-scroll py-10'>
                      {courseCategory === 'e-learning' ? (
                        <div className='flex flex-col gap-3 px-5 h-fit'>
                          <Image
                            src={Globe}
                            priority
                            alt='Globe Image'
                            width={125}
                            height={125}
                            className='aspect-square'
                          />
                          <div className='flex flex-col gap-6'>
                            <h3 className='font-medium'>E - Learning</h3>
                            <p className='body-m dark:!text-navy-200'>
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
                        <div className='grid grid-cols-1 xl:gap-6 items-start h-fit'>
                          {courses.map((course) => (
                            <Link
                              className='p-4 flex items-center gap-4 hover:bg-white group/item min-h-[118px] duration-300 transition-all relative'
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
                                  className='group-hover/item:text-navy-700 duration-300 transition-all text-base'
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      course.title.rendered ??
                                      course.yoast_head_json.og_title,
                                  }}
                                ></h4>
                                <p className='font-normal group-hover/item:text-navy-400 duration-300 transition-all line-clamp-2 text-sm'>
                                  {course.acf.about_course.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </>
      )}
    </>
  );
};

HeaderMobileMenu.displayName = 'HeaderMobileMenu';

export default HeaderMobileMenu;
