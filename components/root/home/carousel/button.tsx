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
import IconChevronRight from '@/components/icon/chevron-right';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  carouselApi: CarouselApi | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollPrev();
  }, [carouselApi]);

  const onNextButtonClick = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollNext();
  }, [carouselApi]);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    setPrevBtnDisabled(!carouselApi?.canScrollPrev());
    setNextBtnDisabled(!carouselApi?.canScrollNext());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    onSelect(carouselApi);
    carouselApi.on('reInit', onSelect);
    carouselApi.on('select', onSelect);
  }, [carouselApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
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
      className='!bg-transparent !p-0'
      type='button'
      noArrow
      {...restProps}
    >
      <span className='rotate-180'>
        <IconChevronRight />
      </span>
      {children}
    </Button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Button
      className='!bg-transparent !p-0'
      type='button'
      noArrow
      {...restProps}
    >
      <IconChevronRight />
      {children}
    </Button>
  );
};
