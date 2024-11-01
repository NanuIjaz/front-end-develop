/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable default-case */
'use client';

// React
import React, { useState, useEffect, useCallback } from 'react';

// Framer
import { motion, useScroll } from 'framer-motion';

// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useRouter, useSearchParams } from 'next/navigation';

// Hook
import { useScrollBlock } from '@/hooks/useScrollBlock';

// Util
import { cn } from '@/lib/utils';

// Interface
import { TCourse, TCourseCategory } from '@/types/courses.type';
import { TGeneralHeaders, TGeneralNav } from '@/types/general.type';

// Api
import { fetchCoursesByCategory, fetchAllCourse } from '@/api/courses.api';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);
const HeaderNav = dynamic(() => import('@/components/root/header/nav'));
const ThemeSwitch = dynamic(
  () => import('@/components/root/header/theme-switch'),
);
const HeaderNavToggle = dynamic(
  () => import('@/components/root/header/nav-toggle'),
);
const HeaderMenu = dynamic(() => import('@/components/root/header/menu'));
const HeaderMobileMenu = dynamic(
  () => import('@/components/root/header/mobile-menu'),
);

const HeaderContent = ({
  headers,
  courseCategories,
  navigation,
}: {
  headers: TGeneralHeaders;
  courseCategories: TCourseCategory[];
  navigation: TGeneralNav;
}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const courseCategory = searchParams.get('courseCategory');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const [isNavActive, setIsNavActive] = useState(false);
  const [isCourse, setIsCourse] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [courses, setCourses] = useState<TCourse[]>([]);

  const { scrollY } = useScroll();

  function update() {
    // @ts-expect-error: scrollY does not have current and prev properties, but we know they exist
    const { current, prev } = scrollY;

    const isScrolled = current > 100 && current > prev;
    const hasScrolledDownCheck = current > 0;

    setScrolled(isScrolled);
    setHasScrolledDown(hasScrolledDownCheck && current > 80);
  }

  useEffect(() => scrollY.onChange(() => update()));

  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    if (isNavActive || isCourse) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [allowScroll, blockScroll, isNavActive, isCourse]);

  /**
   * @description fetch course by category id
   *
   * @return {Promise<void>}
   */
  const fetchCourses = useCallback(
    async (category: TCourseCategory, withPush?: boolean) => {
      try {
        setCourses([]);

        let response;

        if (courseCategory === '/' || category?.slug === '/') {
          response = await fetchAllCourse({
            categories: undefined,
          });
        } else {
          response = await fetchCoursesByCategory({
            categories: category?.slug,
          });

          if (withPush)
            push(`?activeCourses=true&courseCategory=${category?.slug}`);
        }

        setCourses(response);
      } catch (_) {
        //
      }
    },
    [push, courseCategory],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchCourses(courseCategories[0]);
  }, []);

  useEffect(() => {
    fetchCourses({ ...courseCategories[0], slug: courseCategory ?? '/' });
  }, [courseCategory]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 200) {
        setIsCourse(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * @description handle smooth scroll to Home Courses section
   */
  const onMouseClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const coursesSection = document.getElementById('home-courses');

    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const image = headers.header_image[isLight ? 'light_mode' : 'dark_mode'];

  return (
    <motion.header
      initial={false}
      animate={{ y: scrolled ? '-100%' : '0%' }}
      transition={{
        duration: 0.4,
      }}
      className='fixed inset-x-0 top-0 z-[100] bg-white dark:bg-navy-700'
    >
      <div
        className={cn(
          'relative z-[100] mx-auto flex w-full xl:container items-center justify-between gap-10 px-5 2xl:px-0 !border-b-[#0029361A] dark:!border-b-white/10 border border-transparent bg-white dark:bg-navy-700 max-sm:!border-none',
          hasScrolledDown ? 'py-3' : 'pt-6 xl:py-0',
          isNavActive &&
            'bg-white dark:bg-navy-700 lg:!bg-transparent !py-6 !border-none',
        )}
      >
        <Link
          href='/'
          onClick={() => {
            setIsNavActive(false);
          }}
          className='block w-full max-w-[135px]'
        >
          <Image src={image.url} width={136} height={34} alt='Logo' />
        </Link>

        {/* Center Menu */}
        <HeaderMenu
          isNavActive={isNavActive}
          headers={headers}
          courseCategories={courseCategories}
          setIsOpen={setIsOpen}
        />

        <div className='flex items-center gap-4 md:gap-6'>
          <Button
            variant='white'
            className='hidden xl:flex'
            onClick={onMouseClick}
          >
            Enroll Now
          </Button>
          <ThemeSwitch isNavActive={isNavActive} />
          <HeaderNavToggle
            isNavActive={isNavActive}
            setIsNavActive={setIsNavActive}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <HeaderMobileMenu
        courseCategories={courseCategories}
        headers={headers}
        isNavActive={isNavActive}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        courses={courses}
        setIsCourse={setIsCourse}
      />

      <HeaderNav
        isNavActive={isNavActive}
        setIsNavActive={setIsNavActive}
        navigation={navigation}
      />
    </motion.header>
  );
};

HeaderContent.displayName = 'HeaderContent';

export default HeaderContent;
