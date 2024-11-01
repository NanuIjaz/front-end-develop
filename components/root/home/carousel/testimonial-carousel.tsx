'use client';

// React
import { useState } from 'react';

// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Hooks
import { usePrevNextButtons } from '@/components/root/home/carousel/button';

// Type
import { THomeTestimonialItem } from '@/types/home.type';
import { type CarouselApi } from '@/components/ui/carousel';

// Dynamic Components
const Carousel = dynamic(() =>
  import('@/components/ui/carousel').then((carousels) => carousels.Carousel),
);
const CarouselContent = dynamic(() =>
  import('@/components/ui/carousel').then(
    (carousels) => carousels.CarouselContent,
  ),
);
const CarouselItem = dynamic(() =>
  import('@/components/ui/carousel').then(
    (carousels) => carousels.CarouselItem,
  ),
);
const NextButton = dynamic(() =>
  import('@/components/root/home/carousel/button').then(
    (carousels) => carousels.NextButton,
  ),
);
const PrevButton = dynamic(() =>
  import('@/components/root/home/carousel/button').then(
    (carousels) => carousels.PrevButton,
  ),
);

const HomeCarouselTestimonial = ({
  items,
}: {
  items: THomeTestimonialItem[];
}) => {
  // Hooks
  const [api, setApi] = useState<CarouselApi>();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(api);

  return (
    <div className='xl:container py-24 px-5 2xl:px-0'>
      <Carousel className='w-full' setApi={setApi}>
        <CarouselContent>
          {items.map((testimonial) => {
            const words = testimonial.testimonial.split(' ');

            const firstHalf = words.slice(0, 9).join(' ');
            const secondHalf = words.slice(9).join(' ');

            return (
              <CarouselItem
                className='grid grid-cols-2 items-center gap-10 xl:gap-0'
                key={testimonial.name}
              >
                <div className='flex flex-col gap-8 col-span-2 xl:col-span-1'>
                  <div className='w-[77px] h-[77px] rounded-full bg-black/5 dark:bg-[#D9D9D9]/10 relative'>
                    {testimonial?.image?.url && (
                      <Image
                        src={testimonial.image.url}
                        alt='Image Testimonial'
                        width={77}
                        height={77}
                        quality={100}
                        priority
                        className='absolute top-0 bottom-0 right-0 left-0 z-0 w-full h-full object-fill aspect-auto rounded-full'
                      />
                    )}
                  </div>
                  <div className='flex flex-col gap-4'>
                    <h2>{testimonial.name}</h2>
                    <p className='font-normal text-[15px] !text-navy-400 dark:!text-navy-200'>
                      {testimonial.position}
                    </p>
                  </div>
                  <div className='items-center gap-8 flex xl:hidden'>
                    <PrevButton
                      onClick={onPrevButtonClick}
                      disabled={prevBtnDisabled}
                    />
                    <NextButton
                      onClick={onNextButtonClick}
                      disabled={nextBtnDisabled}
                    />
                  </div>
                </div>
                <div className='flex justify-between col-span-2 xl:col-span-1'>
                  <h2 className='font-medium text-2xl xl:text-[40px] max-w-[566px] leading-[28.8px] xl:leading-[48px]'>
                    {firstHalf}
                    <span className='text-navy-400 dark:!text-navy-100/50'>
                      {' '}
                      {secondHalf}
                    </span>
                  </h2>
                  <span className='rotate-180 !text-transparent bg-clip-text bg-[linear-gradient(265.48deg,var(--tw-gradient-stops))] from-red from-[-17.21%] to-yellow to-[98.85%] text-[100px] -mb-10'>
                    “
                  </span>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className='items-center gap-8 mt-8 hidden xl:flex'>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

HomeCarouselTestimonial.displayName = 'HomeCarouselTestimonial';

export default HomeCarouselTestimonial;
