// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Type
import { TElearning } from '@/types/e-learning';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const ELearningBanner = ({ data }: { data: TElearning }) => {
  // Destruct Data
  const { heading, title, description, hero_button, hero_image } =
    data.acf.hero;

  return (
    <section
      className='h-full xl:h-screen mb-28 xl:pt-[91px] !z-0 xl:container'
      id='e-learning-banner'
    >
      <div className='w-full grid grid-cols-1 xl:grid-cols-2 h-full overflow-hidden gap-10 !z-0'>
        <div className='flex justify-end items-center'>
          <div className='w-[680px] top-[-90px]'>
            <div className='flex flex-col gap-8 max-sm:items-center max-sm:justify-center max-sm:px-5'>
              <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
                {heading}
              </p>
              <h1 className='max-sm:text-center'>{title}</h1>
              <p className='body-m text-navy-400 dark:!text-navy-200 text-center lg:text-left whitespace-pre-line'>
                {description}
              </p>
              <Link
                className='w-full lg:w-fit'
                href={hero_button.url.url ?? '#'}
              >
                <Button variant='white' className='w-full lg:w-fit'>
                  {hero_button.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Image
          priority
          quality={100}
          src={hero_image.url}
          width={hero_image.width}
          height={hero_image.height}
          alt='E-Learning Image'
          className='object-cover h-full w-full'
        />
      </div>
    </section>
  );
};

ELearningBanner.displayName = 'ELearningBanner';

export default ELearningBanner;
