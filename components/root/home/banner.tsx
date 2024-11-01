'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { THomeData } from '@/types/home.type';
import { useTheme } from 'next-themes';

const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const HomeBanner = ({ data }: { data: THomeData }) => {
  const { tittle, heading, description, button, animate } = data.hero;

  const { theme } = useTheme();
  const isDark = theme !== 'light';

  const [videoUrl, setVideoUrl] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('');
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    if (isSafari) {
      if (isDark) {
        setVideoUrl(animate?.dark_safari?.url);
        setMimeType(animate?.dark_safari?.mime_type);
      } else {
        setVideoUrl(animate?.light_safari?.url);
        setMimeType(animate?.light_safari?.mime_type);
      }
    } else {
      if (isDark) {
        setVideoUrl(animate?.['dark_non-safari']?.url);
        setMimeType(animate?.['dark_non-safari']?.mime_type);
      } else {
        setVideoUrl(animate?.['light_non-safari']?.url);
        setMimeType(animate?.['light_non-safari']?.mime_type);
      }
    }
  }, [animate, isDark, theme, isSafari]);

  const onMouseClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const aboutUsSection = document.getElementById('about-us');

    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className='h-full xl:h-screen pt-16 xl:pt-[91px]'
      id='homepage-banner'
    >
      <div className='flex flex-col xl:flex-row justify-between items-center lg:container h-full'>
        <div className='flex flex-col gap-8 lg:max-w-lg items-center lg:items-start px-5 2xl:px-0'>
          <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
            {tittle}
          </p>
          <h1 className='text-center lg:text-left'>{heading}</h1>
          <p className='body-m text-navy-400 dark:!text-navy-200 text-center lg:text-left'>
            {description}
          </p>
          <Button
            variant='white'
            className='w-full lg:w-fit'
            onClick={onMouseClick}
          >
            {button.label}
          </Button>
        </div>
        {videoUrl && (
          <video
            autoPlay
            muted
            playsInline
            loop
            preload='auto'
            aria-label='Video player'
            className='aspect-square h-[513px] w-[513px]'
            key={videoUrl}
          >
            <source src={videoUrl} type={mimeType} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </section>
  );
};

HomeBanner.displayName = 'HomeBanner';

export default HomeBanner;
