// React
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

// Type
import { type CarouselApi } from '@/components/ui/carousel';

// Next
import dynamic from 'next/dynamic';

// Icon
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

type UsePrevNextButtonsType = {
  currentSlide: number;
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  onClickBullet: (index: number) => void;
};

export const usePrevNextButtons = (
  carouselApi: CarouselApi | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const onPrevButtonClick = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollPrev();
  }, [carouselApi]);

  const onNextButtonClick = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollNext();
  }, [carouselApi]);

  const onClickBullet = useCallback(
    (index: number) => {
      if (!carouselApi) return;
      carouselApi.scrollTo(index);
    },
    [carouselApi],
  );

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    setPrevBtnDisabled(!carouselApi?.canScrollPrev());
    setNextBtnDisabled(!carouselApi?.canScrollNext());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    onSelect(carouselApi);
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on('reInit', onSelect);
    carouselApi.on('select', onSelect);
    carouselApi.on('select', () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi, onSelect]);

  return {
    currentSlide,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onClickBullet,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Button
      type='button'
      variant='white'
      className='px-5 py-3'
      {...restProps}
      noArrow
    >
      <ChevronLeft className='w-4' />
      {children}
    </Button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Button
      type='button'
      variant='white'
      className='px-5 py-3'
      {...restProps}
      noArrow
    >
      <ChevronRight className='w-4' />
      {children}
    </Button>
  );
};
