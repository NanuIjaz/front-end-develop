// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Image
import FaqGlobe from '@/public/image/globe.png';

// Type
import { TCommunity } from '@/types/community.type';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const CommunityBanner = ({ data }: { data: Pick<TCommunity, 'hero'> }) => {
  const { heading, tittle, description, button_hero } = data.hero;

  return (
    <section className='h-full xl:h-screen xl:pt-[91px]' id='community-banner'>
      <div className='flex flex-col xl:flex-row justify-between items-center xl:container h-full px-5 2xl:px-0 py-16 xl:py-0'>
        <div className='flex flex-col gap-8 xl:max-w-2xl items-center xl:items-start'>
          <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
            {tittle}
          </p>
          <h1 className='text-center xl:text-left'>{heading}</h1>
          <p className='body-m text-navy-400 dark:!text-navy-200 text-center lg:text-left whitespace-pre-line max-w-xl'>
            {description}
          </p>
          <Link className='w-full lg:w-fit' href={button_hero.url.url ?? '#'}>
            <Button variant='white' className='w-full lg:w-fit'>
              {button_hero.label}
            </Button>
          </Link>
        </div>
        <Image
          src={FaqGlobe}
          alt='Faq Banner Illustration'
          quality={100}
          priority
          width={288}
          height={288}
          className='aspect-square max-w-[217px] max-h-[217px] xl:max-w-fit xl:max-h-fit'
        />
      </div>
    </section>
  );
};

CommunityBanner.displayName = 'CommunityBanner';

export default CommunityBanner;
