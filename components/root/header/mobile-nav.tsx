/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */

// React
import React, { Dispatch, SetStateAction, useState } from 'react';

// Next
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Framer Motion
import { AnimatePresence, motion } from 'framer-motion';

// Components
import { WpImage } from '@/components/elements/wordpress';
import Asset from '@/components/elements/wp-assets';

// Type
import {
  TGeneralNav,
  TGeneralNavAbout,
  TGeneralNavCardano,
  TGeneralNavCareer,
  TGeneralNavProduct,
  TGeneralNavResource,
  TGeneralNavSolution,
} from '@/types/general.type';
import { TCommonImage, TCommonUrl } from '@/types/common.type';

// Dynamic Component
const Dot = dynamic(() =>
  import('@/components/root/header/desktop-nav').then((desktop) => desktop.Dot),
);
const Social = dynamic(() => import('@/components/root/header/social'));

export default function MobileNav({
  setIsNavActive,
  navigation,
}: {
  setIsNavActive: (val: boolean) => void;
  navigation: TGeneralNav;
}) {
  const { header, social } = navigation;

  const [activeDropdown, setActiveDropdown] = useState(9999);

  const [isFocused, setIsFocused] = useState(activeDropdown);

  return (
    <div className='min-h-screen overflow-scroll bg-white dark:bg-navy-700 lg:hidden'>
      <div className='flex flex-col justify-between pt-[130px] pb-20 px-5'>
        <div
          className='flex-1 space-y-12'
          onMouseLeave={() => setIsFocused(activeDropdown)}
        >
          {header?.links.map((link, i) => {
            return (
              <DropdownItem
                key={`mobile-DropdownItem-${i}`}
                i={i}
                {...link}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                setIsFocused={setIsFocused}
                isFocused={isFocused}
                setIsNavActive={setIsNavActive}
              />
            );
          })}
        </div>

        <div className='mt-20 md:mt-[115px]'>
          <Social bg={false} tight={false} {...social} center />
        </div>
      </div>
    </div>
  );
}

function DropdownItem({
  link,
  has_sub_menu,
  nav_type,
  solutions_nav,
  company_nav,
  resources_nav,
  i,
  setActiveDropdown,
  activeDropdown,
  setIsNavActive,
  isFocused,
  setIsFocused,
}: {
  link: TCommonUrl;
  has_sub_menu: boolean;
  nav_type: string;
  solutions_nav: {
    solutions: TGeneralNavSolution[];
    products: TGeneralNavProduct[];
  };
  company_nav: {
    about: TGeneralNavAbout;
    careers: TGeneralNavCareer;
  };
  resources_nav: {
    resources: TGeneralNavResource[];
    cardano: TGeneralNavCardano[];
  };
  i: number;
  setActiveDropdown: Dispatch<SetStateAction<number>>;
  activeDropdown: number | null;
  setIsNavActive: (val: boolean) => void;
  isFocused: number;
  setIsFocused: Dispatch<SetStateAction<number>>;
}) {
  const isActive = activeDropdown === i;
  if (has_sub_menu) {
    return (
      <div>
        <button
          type='button'
          aria-label='Toggle Dropdown'
          onClick={() => setActiveDropdown(isActive ? 9999 : i)}
          onMouseEnter={() => setIsFocused(i)}
          className='relative block w-full text-left'
        >
          <div className='flex w-full items-center justify-between'>
            <p className='text-[22px] !leading-[1.05] !tracking-[-0.03em] !font-normal'>
              {link.title}
            </p>
            <div className='relative'>
              <div className='absolute top-0 bottom-0 my-auto h-2 w-2 rounded-full !bg-navy-100 dark:!bg-navy-500' />
              {isFocused === i ? <Dot isMobile /> : null}
            </div>
          </div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 1 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className='overflow-hidden'
              >
                <div className='flex flex-col pt-6'>
                  {nav_type === 'solutions' && (
                    <SolutionsNav
                      {...solutions_nav}
                      setIsNavActive={setIsNavActive}
                    />
                  )}
                  {nav_type === 'company' && (
                    <CompanyNav
                      {...company_nav}
                      setIsNavActive={setIsNavActive}
                    />
                  )}
                  {nav_type === 'resources' && (
                    <ResourcesNav
                      {...resources_nav}
                      setIsNavActive={setIsNavActive}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    );
  }

  return (
    <Link
      href={`https://emurgo.io${link?.url}`}
      className='flex w-full items-center justify-between'
      onClick={() => setIsNavActive(false)}
      onMouseEnter={() => setIsFocused(i)}
    >
      <p className='text-[22px] !leading-[1.05] !tracking-[-0.03em]'>
        {link.title}
      </p>
      <div className='relative'>
        <div className='absolute top-0 bottom-0 my-auto h-2 w-2 rounded-full !bg-navy-100 dark:!bg-navy-500' />
        {isFocused === i ? <Dot isMobile /> : null}
      </div>
    </Link>
  );
}

function Tagline({ tagline, delay }: { tagline: string; delay: number }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay,
      }}
      className='uppercase font-medium !text-navy-300 tracking-widest text-xs'
    >
      {tagline}
    </motion.p>
  );
}

function SolutionsNav({
  products,
  solutions,
  setIsNavActive,
}: {
  products: TGeneralNavProduct[];
  solutions: TGeneralNavSolution[];
  setIsNavActive: (isNavActive: boolean) => void;
}) {
  return (
    <div>
      <div className='grid gap-4 md:grid-cols-2'>
        {solutions.map(({ link, description, asset }, i) => (
          <Link
            href={`https://emurgo.io${link?.url}`}
            key={`mobile-solutions-${i}`}
          >
            <motion.div
              onClick={() => setIsNavActive(false)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 0.5 + i / 12,
                y: {
                  type: 'spring',
                  stiffness: 40,
                  damping: 26,
                  restSpeed: 0.005,
                  restDelta: 0.005,
                  delay: 0.4 + i / 6,
                },
              }}
              className='group flex items-center gap-[14px] rounded-xs bg-navy-50 py-3 pr-3 transition-colors dark:!bg-navy-600 dark:hover:!bg-navy-700'
            >
              <div className='w-[80px] shrink-0'>
                <Asset {...asset} />
              </div>

              <div>
                <h4 className='text-lg font-normal !leading-[1.05] !tracking-[-0.03em] !text-navy-500 dark:!text-navy-100'>
                  {link?.title}
                </h4>
                <div
                  className='text-sm mt-1.5 !leading-[1.4] !text-navy-300'
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className='mt-12'>
        <Tagline tagline='Products' delay={1.4} />

        <div className='mt-10 grid gap-8 md:grid-cols-3'>
          {products.map(({ link, asset }, i) => (
            <Link href={link?.url} key={`mobile-products-${i}`}>
              <motion.div
                onClick={() => setIsNavActive(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                  delay: 1.3 + i / 12,
                  y: {
                    type: 'spring',
                    stiffness: 40,
                    damping: 26,
                    restSpeed: 0.005,
                    restDelta: 0.005,
                    delay: 0.5 + i / 6,
                  },
                }}
                className='group flex items-center gap-3'
              >
                <div className='w-8 shrink-0 opacity-100 transition-opacity group-hover:opacity-60'>
                  <Asset {...asset} />
                </div>
                <div className='flex flex-1 items-center justify-between gap-3'>
                  <h4 className='text-lg font-medium !text-navy-500 transition-colors group-hover:!text-navy-700 dark:!text-navy-100 dark:group-hover:!text-white'>
                    {link?.title}
                  </h4>
                  <svg
                    className='w-2 transition-all'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 10 10'
                  >
                    <path
                      d='M1 1h8m0 0v8m0-8L1 9'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
function CompanyNav({
  about,
  careers,
  setIsNavActive,
}: {
  about: TGeneralNavAbout;
  careers: TGeneralNavCareer;
  setIsNavActive: (isNavActive: boolean) => void;
}) {
  const { main_link, links } = about;
  const { link, description } = careers;
  return (
    <div className='flex h-full flex-col items-center gap-[53px]'>
      <div className='w-full'>
        <CardLink
          {...main_link}
          text='About Us'
          setIsNavActive={setIsNavActive}
        />
        <div className='mt-10 flex flex-col gap-6 pl-4'>
          {links.map(({ link }, i) => (
            <motion.div
              key={`mobile-company-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 0.6 + i / 12,
                y: {
                  type: 'spring',
                  stiffness: 40,
                  damping: 26,
                  restSpeed: 0.005,
                  restDelta: 0.005,
                  delay: 0.5 + i / 6,
                },
              }}
            >
              <ArrowedLink link={link} setIsNavActive={setIsNavActive} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <CardLink
          link={link}
          description={description}
          text='Careers'
          image={careers?.image}
          setIsNavActive={setIsNavActive}
        />
      </div>
    </div>
  );
}
function ResourcesNav({
  resources,
  cardano,
  setIsNavActive,
}: {
  resources: TGeneralNavResource[];
  cardano: TGeneralNavCardano[];
  setIsNavActive: (isNavActive: boolean) => void;
}) {
  return (
    <div className='flex h-full flex-col items-center gap-[37px]'>
      <div className='flex w-full flex-col gap-4'>
        <div className='space-y-6'>
          {resources.map(({ link }, i) => (
            <motion.div
              key={`mobile-resources-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 0.5 + i / 12,
                y: {
                  type: 'spring',
                  stiffness: 40,
                  damping: 26,
                  restSpeed: 0.005,
                  restDelta: 0.005,
                  delay: 0.6 + i / 6,
                },
              }}
            >
              <ArrowedLink link={link} setIsNavActive={setIsNavActive} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className='w-full flex-1'>
        <Tagline tagline='Cardano' delay={0.8} />

        <div className='mt-10 w-full flex-1 space-y-4'>
          {cardano.map(({ link, description, image }, i) => (
            <motion.div
              key={`mobile-cardano-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 1.4 + i / 12,
                y: {
                  type: 'spring',
                  stiffness: 40,
                  damping: 26,
                  restSpeed: 0.005,
                  restDelta: 0.005,
                  delay: 0.8 + i / 6,
                },
              }}
            >
              <Link
                href={`https://emurgo.io${link?.url}`}
                className='group flex items-end gap-5 bg-navy-50 p-2 dark:bg-navy-600'
                onClick={() => setIsNavActive(false)}
              >
                <WpImage
                  image={image}
                  className='object-cover object-center relative aspect-1 w-full max-w-[80px] shrink-0 overflow-hidden rounded-[4px] xs:max-w-[250px]'
                  priority
                />
                <div className='flex flex-col py-1.5'>
                  <h4 className='text-lg !leading-[1.05] !tracking-[-0.03em] !text-navy-500 dark:!text-navy-100'>
                    {link?.title}
                  </h4>
                  {description && (
                    <p className='mt-1.5 text-[12px] leading-normal !text-navy-300'>
                      {description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardLink({
  link,
  description,
  text,
  image,
  setIsNavActive,
}: {
  link: TCommonUrl;
  description: string;
  text: string;
  image: TCommonImage;
  setIsNavActive: (isNavActive: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.5,
        y: {
          type: 'spring',
          stiffness: 40,
          damping: 26,
          restSpeed: 0.005,
          restDelta: 0.005,
          delay: 0.5,
        },
      }}
    >
      <Link
        href={`https://emurgo.io${link?.url}`}
        className='group block rounded-md !bg-navy-50 p-4 dark:!bg-navy-600'
        onClick={() => setIsNavActive(false)}
      >
        <p className='tagline font-medium !text-navy-400 dark:!text-navy-200 text-[11px] lg:text-xs'>
          {text}
        </p>
        <div className='mt-10 flex items-center gap-[11px]'>
          <h4 className='text-[22px] !text-navy-700 dark:!text-white font-medium'>
            {link?.title}
          </h4>
          <svg
            className='w-[11px]'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 21 21'
          >
            <path
              d='m10.1924 1.50195 9.1924 9.19235-9.1448 9.1448m7.5192-9.1012L.999995 10.6943'
              stroke='url(#a)'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <defs>
              <linearGradient
                id='a'
                x1='18.8063'
                y1='3.57338'
                x2='5.84845'
                y2='18.5391'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF1055' />
                <stop offset='1' stopColor='#FFD363' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {description && (
          <p className='text-sm mt-2 leading-normal !text-navy-300'>
            {description}
          </p>
        )}
        {image && (
          <div className='relative mt-8 aspect-[295/158] overflow-hidden rounded-md'>
            <WpImage
              image={image}
              fill
              className='object-cover object-center'
              priority
            />
          </div>
        )}
      </Link>
    </motion.div>
  );
}

function ArrowedLink({
  link,
  setIsNavActive,
}: {
  link: TCommonUrl;
  setIsNavActive: (isNavActive: boolean) => void;
}) {
  return (
    <Link
      href={`https://emurgo.io${link?.url}`}
      className='group flex items-center justify-between gap-[11px]'
      onClick={() => setIsNavActive(false)}
    >
      <h4 className='text-[22px] !text-navy-700 dark:!text-white font-medium'>
        {link?.title}
      </h4>
      <svg
        className='w-[17px]'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 21 21'
      >
        <path
          d='M6.72803 0.771973L12.3849 6.42883M12.3849 6.42883L6.72803 12.0857M12.3849 6.42883H1.07117'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Link>
  );
}
