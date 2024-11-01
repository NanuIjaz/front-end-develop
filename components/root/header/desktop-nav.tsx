// React
import { Dispatch, SetStateAction, useState } from 'react';

// Next
import Link from 'next/link';

// Framer Motion
import { AnimatePresence, motion } from 'framer-motion';

// Util
import { cn } from '@/lib/utils';

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
import { TCommonUrl } from '@/types/common.type';

export default function DesktopNav({
  setIsNavActive,
  navigation,
}: {
  setIsNavActive: (val: boolean) => void;
  navigation: TGeneralNav;
}) {
  const { header } = navigation;

  const [activeSection, setActiveSection] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<number>(activeSection);

  return (
    <div className='hidden lg:block lg:h-full'>
      <div className='absolute top-0 left-0 h-full w-1/2 bg-white dark:bg-navy-700' />
      <div className='absolute top-0 right-0 h-full w-1/2 bg-navy-50 dark:bg-navy-600' />
      <div className='container relative z-10 grid h-full grid-cols-4'>
        <div className='pt-[90px]x flex items-center bg-white dark:bg-navy-700'>
          <div
            className='space-y-10 pl-4'
            onMouseLeave={() => setIsFocused(activeSection)}
          >
            {header?.links.map(({ link, has_sub_menu }, i) => {
              if (!has_sub_menu)
                return (
                  <DefaultLink
                    key={`desktop-header-${i}`}
                    i={i}
                    link={link}
                    setIsFocused={setIsFocused}
                    isFocused={isFocused}
                    setIsNavActive={setIsNavActive}
                  />
                );
              return (
                <DefaultButton
                  i={i}
                  key={`desktop-header-${i}`}
                  link={link}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  setIsFocused={setIsFocused}
                  isFocused={isFocused}
                />
              );
            })}
          </div>
        </div>
        <div className='pt-[90px]x col-span-3 bg-navy-50 pl-[74px] dark:bg-navy-600'>
          {header?.links.map(
            (
              {
                has_sub_menu,
                nav_type,
                solutions_nav,
                company_nav,
                resources_nav,
              },
              i,
            ) => {
              if (!has_sub_menu) return null;
              return (
                <AnimatePresence mode='popLayout' key={`desktop-links-${i}`}>
                  {activeSection === i && (
                    <motion.div
                      key={`desktop-nav-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                        transition: { delay: 0.3, duration: 0.3 },
                      }}
                      className='h-full'
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

function Tagline({ text, delay = 0.5 }: { text: string; delay: number }) {
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
      {text}
    </motion.p>
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
    <div className='flex h-full flex-row items-center gap-[37px]'>
      <div className=' flex aspect-[270/389] w-full max-w-[270px] shrink-0 flex-col gap-10'>
        <Tagline text='Resources' delay={0.4} />

        <div className='space-y-6'>
          {resources.map(({ link }, i) => (
            <motion.div
              key={`desktop-resources-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
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
            >
              <Link
                href={`https://emurgo.io${link?.url}`}
                className='group flex items-center gap-[11px]'
                onClick={() => {
                  setIsNavActive(false);
                }}
              >
                <h4 className='text-2xl font-bold !text-navy-700 dark:!text-white'>
                  {link?.title}
                </h4>
                <Arrow />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className='flex-1'>
        <Tagline text='Cardano' delay={0.6} />
        <div className='mt-10 flex-1 space-y-4'>
          {cardano.map(({ link, description, image }, i) => (
            <motion.div
              key={`desktop-cardano-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                delay: 0.6 + i / 12,
                y: {
                  type: 'spring',
                  stiffness: 40,
                  damping: 26,
                  restSpeed: 0.005,
                  restDelta: 0.005,
                  delay: 0.4 + i / 6,
                },
              }}
            >
              <Link
                href={`https://emurgo.io${link?.url}`}
                className='group relative flex items-end gap-5 bg-white p-2 dark:bg-navy-700'
                onClick={() => {
                  setIsNavActive(false);
                }}
              >
                <WpImage
                  image={image}
                  className='object-cover object-center w-full max-w-[144px] relative rounded aspect-square shrink-0'
                  priority
                />
                <div className='flex flex-col py-1.5'>
                  <h4 className='t-18 font-medium !leading-[1.05] !tracking-[-0.03em] text-navy-500 dark:text-navy-100'>
                    {link?.title}
                  </h4>
                  {description && (
                    <p className='text-sm mt-1.5 max-w-[90%] pb-1.5 leading-normal !text-navy-400 dark:!text-navy-200'>
                      {description}
                    </p>
                  )}
                </div>
                <div className='absolute top-4 right-4'>
                  <Arrow />
                </div>
              </Link>
            </motion.div>
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
  const { main_link, links, image } = about;
  const { link, description } = careers;
  return (
    <div className='flex h-full flex-row items-center gap-[44px]'>
      <div className='aspect-[442/329] w-full max-w-[442px] shrink-0'>
        <Tagline text='Company' delay={0.4} />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            delay: 0.5,
            y: {
              type: 'spring',
              stiffness: 40,
              damping: 26,
              restSpeed: 0.005,
              restDelta: 0.005,
              delay: 0.2,
            },
          }}
          className='mt-10'
        >
          <Link
            href={`https://emurgo.io${main_link?.link?.url}`}
            className='group'
            onClick={() => {
              setIsNavActive(false);
            }}
          >
            <div className='flex items-center gap-[11px]'>
              <h4 className='text-[28px] font-bold !text-navy-700 dark:!text-white'>
                {main_link?.link?.title}
              </h4>
              <Arrow />
            </div>
            {main_link?.description && (
              <p className='text-sm mt-2 leading-normal !text-navy-400 dark:!text-navy-200'>
                {main_link?.description}
              </p>
            )}
          </Link>
        </motion.div>
        <div className='mt-10 flex'>
          <div className='flex flex-1 flex-col justify-end space-y-6'>
            {links.map(({ link }, i: number) => (
              <motion.div
                key={`desktop-company-${i}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
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
              >
                <Link
                  href={`https://emurgo.io${link?.url}`}
                  className='group flex items-center gap-[11px]'
                  onClick={() => {
                    setIsNavActive(false);
                  }}
                >
                  <h4 className='text-2xl font-bold !text-navy-300 transition-all hover:!text-navy-700 dark:hover:!text-white'>
                    {link?.title}
                  </h4>
                  <DarkArrow />
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: 0.5,
              y: {
                type: 'spring',
                stiffness: 40,
                damping: 26,
                restSpeed: 0.005,
                restDelta: 0.005,
                delay: 0.2,
              },
            }}
            className='relative aspect-1 w-full max-w-[176px] shrink-0 overflow-hidden rounded-md'
          >
            <WpImage
              image={image}
              fill
              className='object-cover object-center'
              priority
            />
          </motion.div>
        </div>
      </div>
      <div className='flex-1'>
        <Tagline text='Careers' delay={0.8} />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            delay: 0.8,
            y: {
              type: 'spring',
              stiffness: 40,
              damping: 26,
              restSpeed: 0.005,
              restDelta: 0.005,
              delay: 0.7,
            },
          }}
          className='mt-10'
        >
          <Link
            href={`https://emurgo.io${link?.url}`}
            className='group'
            onClick={() => {
              setIsNavActive(false);
            }}
          >
            <div className='flex items-center gap-[11px]'>
              <h4 className='text-[28px] font-bold !text-navy-700 dark:!text-white'>
                {link?.title}
              </h4>
              <Arrow />
            </div>
            {description && (
              <p className='text-sm mt-2 leading-normal !text-navy-400 dark:!text-navy-200'>
                {description}
              </p>
            )}

            <div className='relative mt-10 aspect-[335/176] overflow-hidden rounded-md'>
              <WpImage
                image={careers?.image}
                fill
                className='object-cover object-center'
                priority
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
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
    <div className='flex h-full flex-col justify-center'>
      <div>
        <Tagline text='Solutions' delay={0.4} />
        <div className='mt-6 grid grid-cols-2 gap-y-3 gap-x-10'>
          {solutions.map(({ link, description, asset }, i: number) => (
            <Link
              href={`https://emurgo.io${link?.url}`}
              key={`desktop-solutions-${i}`}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                  delay: 0.5 + i / 12,
                  y: {
                    type: 'spring',
                    stiffness: 40,
                    damping: 26,
                    restSpeed: 0.005,
                    restDelta: 0.005,
                    delay: 0.2 + i / 6,
                  },
                }}
                className='group flex items-center gap-3 rounded-lg py-3 transition-colors dark:hover:!bg-navy-700'
                onClick={() => {
                  setIsNavActive(false);
                }}
              >
                <div className='w-[72px] shrink-0'>
                  <Asset {...asset} />
                </div>

                <div>
                  <div className='flex items-center gap-[11px]'>
                    <h4 className='t-18 font-medium !leading-[1.05] !tracking-[-0.03em] !text-navy-500 dark:!text-navy-100'>
                      {link?.title}
                    </h4>
                    <Arrow />
                  </div>
                  <div
                    className='mt-1.5 !text-navy-400 dark:!text-navy-300'
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-12'>
        <Tagline text='Products' delay={0.8} />
        <div className='mt-10 grid grid-cols-3 gap-8'>
          {products.map(({ link, asset }, i: number) => (
            <Link href={link?.url} key={`desktop-products-${i}`}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
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
                onClick={() => {
                  setIsNavActive(false);
                }}
              >
                <div className='w-8 shrink-0 opacity-60 transition-opacity group-hover:!opacity-100'>
                  <Asset {...asset} />
                </div>
                <div className='flex items-center gap-3'>
                  <h4 className='t-18 font-medium !text-navy-400 transition-colors group-hover:text-navy-700 dark:!text-navy-200 dark:group-hover:!text-white'>
                    {link?.title}
                  </h4>
                  <AngledArrow />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DefaultButton({
  link,
  i,
  activeSection,
  setActiveSection,
  setIsFocused,
  isFocused,
}: {
  link: TCommonUrl;
  i: number;
  activeSection: number;
  setActiveSection: (activeSection: number) => void;
  setIsFocused: Dispatch<SetStateAction<number>>;
  isFocused: number;
}) {
  return (
    <motion.div
      onMouseEnter={() => setIsFocused(i)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.5 + i / 12,
        x: {
          type: 'spring',
          stiffness: 40,
          damping: 26,
          restSpeed: 0.005,
          restDelta: 0.005,
          delay: 0.5 + i / 6,
        },
      }}
      className='relative'
    >
      {isFocused === i ? <Dot /> : null}
      <button
        type='button'
        onClick={() => setActiveSection(i)}
        aria-label='Toggle Section'
        className={cn(
          'text-[32px] font-medium transition-colors hover:!text-navy-700 dark:hover:!text-white font-aeonik',
          activeSection === i
            ? '!text-navy-700 dark:!text-white'
            : '!text-navy-300',
        )}
      >
        {link?.title}
      </button>
    </motion.div>
  );
}

function DefaultLink({
  link,
  setIsFocused,
  isFocused,
  i,
  setIsNavActive,
}: {
  link: TCommonUrl;
  setIsFocused: Dispatch<SetStateAction<number>>;
  isFocused: number;
  i: number;
  setIsNavActive: (isNavActive: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.5 + i / 12,
        x: {
          type: 'spring',
          stiffness: 40,
          damping: 26,
          restSpeed: 0.005,
          restDelta: 0.005,
          delay: 0.5 + i / 6,
        },
      }}
      onMouseEnter={() => setIsFocused(i)}
      onClick={() => {
        setIsNavActive(false);
      }}
      className='relative'
    >
      {isFocused === i ? <Dot /> : null}
      <Link
        href={`https://emurgo.io${link?.url}`}
        className='text-[32px] font-medium !text-navy-300 transition-colors hover:!text-navy-700 dark:hover:!text-white font-aeonik'
      >
        {link?.title}
      </Link>
    </motion.div>
  );
}

export function AngledArrow() {
  return (
    <svg
      className='w-2 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'
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
  );
}

export function DarkArrow() {
  return (
    <svg
      className='w-[17px] -translate-x-2 pt-2.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'
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
  );
}

export function Arrow() {
  return (
    <svg
      className='w-[11px] -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'
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
  );
}

export function Dot({ isMobile = false }) {
  return (
    <motion.div
      className={cn(
        'absolute top-0 bottom-0 z-10 my-auto h-2 w-2',
        isMobile ? '' : ' -left-5  ',
      )}
      layoutId='highlight'
    >
      <svg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'>
        <circle cx='4' cy='4' r='4' fill='url(#a)' />
        <defs>
          <linearGradient
            id='a'
            x1='8.00001'
            y1='-.000001'
            x2='.663824'
            y2='8.56836'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FF1055' />
            <stop offset='1' stopColor='#FFD363' />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
