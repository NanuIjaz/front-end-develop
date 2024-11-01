'use client';

// React
import { useWindowSize } from 'react-use';
import { useRef, useState, useEffect } from 'react';

// Next
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Framer
import { motion, useTransform, useScroll, MotionValue } from 'framer-motion';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const Cta = ({
  title,
  button = {
    label: 'Discover Now',
    url: { title: '#', target: '#', url: '/contact-us' },
  },
}: {
  title: string;
  button?: {
    label: string;
    url: { title: string; url: string; target: string };
  };
}) => {
  // Hooks
  const ref = useRef(null);
  const { resolvedTheme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [0, 0.2],
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const urlNotObject = typeof button.url !== 'object';

  return (
    <>
      <section className='xl:container mt-20' id='cta-section' ref={ref}>
        <div className='dark:bg-white bg-navy-700 p-20 xl:p-32 xl:rounded-sm text-center relative mx-auto overflow-hidden'>
          <div className='flex flex-col gap-8 xl:gap-10 items-center justify-center z-50 relative'>
            <h1 className='text-2xl xl:text-[64px] text-white dark:text-navy-700 leading-[26.4px] xl:leading-[70.4px] text-center max-w-[900px]'>
              {title}
            </h1>
            <Link
              href={urlNotObject ? '/contact-us' : button?.url?.url}
              title={button?.url?.title}
            >
              <Button className='w-fit'>{button?.label}</Button>
            </Link>
          </div>
          <DefaultBlurs />
        </div>
      </section>

      <StickyBlur
        scrollYProgress={scrollYProgress}
        resolvedTheme={resolvedTheme}
      />
    </>
  );
};

Cta.displayName = 'Cta';

export default Cta;

export const DefaultBlurs = () => {
  return (
    <div className='absolute inset-x-0 bottom-[-2px] w-full xl:!rounded-b-sm'>
      <svg
        className='hidden dark:block xl:!rounded-b-sm'
        viewBox='0 0 1328 301'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_f_2441_13320)'>
          <ellipse
            cx='663'
            cy='350.694'
            rx='720'
            ry='210'
            fill='url(#paint0_radial_2441_13320)'
          />
        </g>
        <defs>
          <filter
            id='filter0_f_2441_13320'
            x='-197'
            y='0.694336'
            width='1720'
            height='700'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='45'
              result='effect1_foregroundBlur_2441_13320'
            />
          </filter>
          <radialGradient
            id='paint0_radial_2441_13320'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(663 350.694) rotate(90) scale(210 720)'
          >
            <stop offset='0.526042' stopColor='#FFD363' />
            <stop offset='1' stopColor='#FF1055' />
          </radialGradient>
        </defs>
      </svg>
      <svg
        className='block dark:hidden'
        viewBox='0 0 1328 221'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_931_5065)'>
          <g filter='url(#filter0_f_931_5065)'>
            <ellipse
              cx='663'
              cy='256'
              rx='626'
              ry='148'
              fill='url(#paint0_radial_931_5065)'
            />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_f_931_5065'
            x='-63'
            y='8'
            width='1452'
            height='496'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='50'
              result='effect1_foregroundBlur_931_5065'
            />
          </filter>
          <radialGradient
            id='paint0_radial_931_5065'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(663 256) rotate(90) scale(148 626)'
          >
            <stop offset='0.526042' stopColor='#FFD363' />
            <stop offset='1' stopColor='#FF1055' />
          </radialGradient>
          <clipPath id='clip0_931_5065'>
            <rect
              width='1440'
              height='221'
              fill='white'
              transform='translate(-57)'
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export const StickyBlur = ({
  scrollYProgress,
  resolvedTheme,
}: {
  scrollYProgress: MotionValue<number>;
  resolvedTheme?: string;
}) => {
  const { width } = useWindowSize();
  const blurRef = useRef<SVGSVGElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    if (blurRef.current) {
      setHeight(blurRef.current.clientHeight);
    }
  }, [width, resolvedTheme]);

  const marginTop = useTransform(scrollYProgress, [0, 1], [0, -height]);
  const opacity = useTransform(scrollYProgress, [1, 1], [0, 1]);

  return (
    <motion.div
      style={{ opacity, marginTop }}
      className='pointer-events-none sticky bottom-0 z-40 mx-auto w-full max-w-[1440px] overflow-hidden'
    >
      <motion.svg
        ref={blurRef}
        className='w-full'
        viewBox='0 0 1440 320'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.g
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5,
          }}
          clipPath='url(#clip0)'
        >
          <g filter='url(#filter0)'>
            <ellipse
              cx='721'
              cy='379.5'
              rx='604'
              ry='97.5'
              fill='url(#paint0)'
            />
          </g>
        </motion.g>
        <defs>
          <filter
            id='filter0'
            x='17'
            y='182'
            width='1408'
            height='395'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='45'
              result='effect1_foregroundBlur_2454_18866'
            />
          </filter>
          <radialGradient
            id='paint0'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(721 379.5) rotate(90) scale(97.5 604)'
          >
            <stop offset='0.526042' stopColor='#FFD363' />
            <stop offset='1' stopColor='#FF1055' />
          </radialGradient>
          <clipPath id='clip0'>
            <rect width='1440' height='320' fill='white' />
          </clipPath>
        </defs>
      </motion.svg>
    </motion.div>
  );
};
