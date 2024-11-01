'use client';

// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Type
import { TSolution } from '@/types/solution.type';

// Image
import OurDirectionItem from '@/public/image/our-direction-item.png';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const SolutionsBanner = ({ data }: { data: TSolution }) => {
  // Props
  const { heading, logo_image, description, button } = data.acf.hero;

  // Hooks
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  /**
   * @description handle smooth scroll to Join Us section
   */
  const onMouseClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const aboutUsSection = document.getElementById('solution-join-us');

    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className='h-fit xl:h-screen py-16 xl:pt-[91px] dark:bg-navy-700'
      id='solutions-banner'
    >
      <div className='xl:container flex flex-col xl:flex-row items-center gap-10 xl:gap-0 xl:justify-between z-10 h-full px-5 2xl:px-0'>
        <div className='flex flex-col items-center xl:items-start gap-10 max-w-[641px]'>
          {theme && (
            <>
              <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
                Solutions
              </p>
              <div className='flex flex-col items-center xl:items-start gap-7'>
                <Image
                  priority
                  unoptimized
                  quality={100}
                  src={logo_image[isDark ? 'dark' : 'light'].url}
                  alt='Solutions Image'
                  width={logo_image[isDark ? 'dark' : 'light'].width}
                  height={logo_image[isDark ? 'dark' : 'light'].height}
                  className='aspect-auto max-w-[192px] xl:max-w-[368px]'
                  key={logo_image[isDark ? 'dark' : 'light'].id}
                />
                <h1 className='text-center xl:text-left'>{heading}</h1>
              </div>
            </>
          )}
          <div className='flex flex-col gap-8 max-sm:items-center'>
            <p className='body-m text-navy-400 dark:!text-navy-200 text-center xl:text-left'>
              {description}
            </p>
            <Button variant='white' className='w-fit' onClick={onMouseClick}>
              {button?.label}
            </Button>
          </div>
        </div>
        {data.yoast_head_json.og_image.length >= 1 ? (
          <Image
            src={data.yoast_head_json.og_image[0].url}
            alt='Our Direction Item'
            quality={100}
            priority
            className='aspect-square max-w-[233px] xl:min-w-[475px] object-cover'
            width={data.yoast_head_json.og_image[0].width}
            height={data.yoast_head_json.og_image[0].height}
            unoptimized
          />
        ) : (
          <Image
            src={OurDirectionItem}
            alt='Our Direction Item'
            quality={100}
            priority
            className='aspect-square max-w-[233px] xl:min-w-[475px] object-cover'
            width={220}
            height={220}
            unoptimized
          />
        )}
      </div>
    </section>
  );
};

SolutionsBanner.displayName = 'SolutionsBanner';

export default SolutionsBanner;
