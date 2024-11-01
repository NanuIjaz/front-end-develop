// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Image
import FaqCheckMark from '@/public/image/check-mark.png';

// Type
import { TFaqPage } from '@/types/faq.type';

// Dynamic Component
const FaqSearch = dynamic(() => import('@/components/root/faq/search'));

const FaqBanner = ({ data }: { data: TFaqPage }) => {
  return (
    <section className='h-fit xl:h-screen xl:pt-[91px]' id='faq-banner'>
      <div className='flex flex-col xl:flex-row justify-between items-center xl:container h-full px-5 2xl:px-0'>
        <div className='flex flex-col gap-8 xl:max-w-2xl items-center xl:items-start'>
          <p className='font-medium text-navy-400 tracking-widest text-center xl:text-left'>
            {data.hero.tittle}
          </p>
          <h1 className='text-center xl:text-left'>{data.hero.heading}</h1>
          <div
            className='body-m dark:!text-navy-400 whitespace-pre-line rich-text !text-center xl:!text-left'
            dangerouslySetInnerHTML={{
              __html: data.hero.description,
            }}
          ></div>
          <FaqSearch />
        </div>
        <Image
          src={FaqCheckMark}
          alt='Faq Banner Illustration'
          quality={100}
          priority
          width={475}
          height={475}
          className='aspect-square'
        />
      </div>
    </section>
  );
};

FaqBanner.displayName = 'FaqBanner';

export default FaqBanner;
