'use client';

// React
import { useState } from 'react';

// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Hooks
import { usePrevNextButtons } from '@/components/root/courses/carousel/button';

// Type
import { type CarouselApi } from '@/components/ui/carousel';
import { TCourseGraduateCarousel } from '@/types/courses.type';

// Libs
import { cn } from '@/lib/utils';

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
  import('@/components/root/courses/carousel/button').then(
    (carousels) => carousels.NextButton,
  ),
);
const PrevButton = dynamic(() =>
  import('@/components/root/courses/carousel/button').then(
    (carousels) => carousels.PrevButton,
  ),
);

const CoursesCarouselGraduates = ({
  items,
}: {
  items: TCourseGraduateCarousel[];
}) => {
  // Hooks
  const [api, setApi] = useState<CarouselApi>();
  const {
    currentSlide,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onClickBullet,
  } = usePrevNextButtons(api);

  return (
    <>
      <Carousel className='w-full' setApi={setApi}>
        <CarouselContent>
          {items.length >= 1 &&
            items.map((graduates) => (
              <CarouselItem
                className='flex flex-col xl:flex-row gap-10'
                key={graduates.name}
              >
                <Image
                  src={graduates.image.url}
                  alt='Graduates Image'
                  priority
                  quality={100}
                  width={365}
                  height={365}
                  className='w-full xl:w-[365px] h-[365px] aspect-square'
                />
                <div className='flex flex-col gap-4'>
                  <h2 className='text-2xl xl:text-[32px]'>{graduates.name}</h2>
                  <p className='dark:!text-navy-200 text-xs xl:text-[15px] font-normal'>
                    {graduates.position}
                  </p>
                  <p className='text-xs xl:text-base font-normal dark:!text-navy-200 whitespace-pre-line'>
                    {graduates.quote}
                  </p>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
      <div className='flex items-center xl:justify-between'>
        <div className='items-center gap-2 hidden xl:flex'>
          {items.map((graduates, index) => (
            <div
              className={cn(
                'rounded-full w-5 h-5 bg-[#D9D9D9]/20 cursor-pointer',
                index + 1 === currentSlide && 'bg-orange',
              )}
              onClick={() => onClickBullet(index)}
              key={graduates.name}
            ></div>
          ))}
        </div>
        <div className='flex items-center gap-[14px]'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </>
  );
};

CoursesCarouselGraduates.displayName = 'CoursesCarouselGraduates';

export default CoursesCarouselGraduates;
