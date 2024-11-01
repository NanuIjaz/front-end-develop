'use client';

// Next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

// Type
import { TGeneralFooters } from '@/types/general.type';

const RootFooterContent = ({ footers }: { footers: TGeneralFooters }) => {
  // Hooks
  const { push } = useRouter();
  const { theme } = useTheme();

  const isLight = theme === 'light';

  if (!theme) {
    return null;
  }

  /**
   * @description handle smooth scroll to About Us section
   */
  const handleAboutUsClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    push('/');

    setTimeout(() => {
      e.preventDefault();
      const aboutUsSection = document.getElementById('about-us');

      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  return (
    <div className='flex flex-col gap-14 pt-20'>
      <div className='flex flex-col lg:flex-row gap-[72px] lg:gap-[300px]'>
        <div className='flex flex-col gap-12'>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-8'>
              <Image
                key={theme}
                src={
                  isLight
                    ? footers.footer_image.light_mode.url
                    : footers.footer_image.dark_mode.url
                }
                alt='Emurgo Logo'
                priority
                quality={100}
                width={170}
                height={42}
                unoptimized
              />
              <p className='body-m max-w-[511px] !text-navy dark:!text-navy-200 font-normal'>
                {footers.description}
              </p>
            </div>
            <div className='items-center gap-4 hidden lg:flex'>
              {footers.social_media.item.length >= 1 &&
                footers.social_media.item.map((socials, index) => {
                  const image =
                    socials[isLight ? 'light_mode_icon' : 'dark_mode_icon'];

                  return (
                    <Link
                      href={socials?.url?.url ?? '#'}
                      key={index}
                      className='hover:!text-navy-700 dark:hover:text-white hover:opacity-80'
                    >
                      <Image
                        priority
                        alt='Twitter'
                        quality={100}
                        className='max-h-[17px] object-cover max-w-[19px]'
                        src={image.url}
                        width={image.width}
                        height={image.height}
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='flex flex-col gap-10 max-w-36 w-full'>
            {footers.quick_link.length >= 1 && (
              <p className='!text-[#99A9AF] dark:!text-navy-300 text-xs font-medium uppercase tracking-widest'>
                QUICK LINKS
              </p>
            )}
            <div className='flex flex-col gap-6'>
              {footers.quick_link.length >= 1 &&
                footers.quick_link.map((links, index) => (
                  <Link
                    className='text-[15px] text-navy dark:text-white font-normal'
                    key={links.menu_name ?? index}
                    href={
                      links.menu_url.url === '/about-us'
                        ? '/'
                        : links.menu_url.url ?? ''
                    }
                    onClick={
                      links.menu_url.url === '/about-us'
                        ? handleAboutUsClick
                        : undefined
                    }
                  >
                    <div className='hover-underline'>
                      {links.menu_name ?? ''}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className='flex flex-col gap-10 max-w-60'>
            <p className='!text-[#99A9AF] dark:!text-navy-300 text-xs font-medium uppercase tracking-widest'>
              Contact us
            </p>
            <div className='flex flex-col gap-6'>
              <Link
                className='text-[15px] text-navy dark:text-navy-200 font-normal'
                href={`mailto:${footers.contact_us.email}`}
              >
                {footers.contact_us.email}
              </Link>
              <span className='text-[15px] text-navy dark:text-navy-200 font-normal'>
                {footers.contact_us.location}
              </span>
            </div>
          </div>
        </div>
        <div className='items-center gap-4 flex lg:hidden'>
          {footers.social_media.item.length >= 1 &&
            footers.social_media.item.map((socials, index) => {
              const image =
                socials[isLight ? 'light_mode_icon' : 'dark_mode_icon'];

              return (
                <Link href={socials?.url?.url ?? '#'} key={index}>
                  <Image
                    priority
                    alt='Twitter'
                    quality={100}
                    className='max-h-[17px] object-cover max-w-[19px]'
                    src={image.url}
                    width={image.width}
                    height={image.height}
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <div>
        <hr className='!border-b-[#0029361A] dark:border-white/10 mb-10' />
        <div className='w-full flex items-center justify-center mb-11'>
          <p className='dark:!text-navy-300 text-xs !text-[#99A9AF]'>
            © {new Date().getFullYear()} EMURGO. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

RootFooterContent.displayName = 'RootFooterContent';

export default RootFooterContent;
