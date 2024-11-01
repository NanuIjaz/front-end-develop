/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable default-case */

// React
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';

// Next
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { useWindowSize } from 'react-use';
import { TCommonImage } from '@/types/common.type';

function Asset({
  type = 'image',
  image,
  className,
  classes,
  setParentLoadingComplete,
  parentLoadingComplete,
  has_dark_image = false,
  dark_image,
  position = 'left',
  has_mobile_asset = false,
  ...other
}: {
  type?: string;
  image: TCommonImage;
  className?: string;
  classes?: string;
  setParentLoadingComplete?: (param?: boolean) => void;
  parentLoadingComplete?: boolean;
  has_dark_image: boolean;
  dark_image: TCommonImage;
  position?: string;
  has_mobile_asset?: boolean;
}) {
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  const { width: screenWidth } = useWindowSize();
  if (has_mobile_asset && screenWidth < 768) {
    return (
      <div className='flex justify-center'>{/* <Asset {...mobile} /> */}</div>
    );
  }

  if (type === 'image') {
    if (has_dark_image)
      return (
        <ThemedImage
          setParentLoadingComplete={
            setParentLoadingComplete ? () => setParentLoadingComplete : () => {}
          }
          setLoadingComplete={setLoadingComplete}
          image={image}
          dark_image={dark_image}
          classes={classes ?? ''}
          className={className ?? ''}
          parentLoadingComplete={parentLoadingComplete ?? true}
          loadingComplete={loadingComplete}
        />
      );
    if (!image?.url) return null;
    return (
      <Image
        onLoad={() =>
          setParentLoadingComplete
            ? setParentLoadingComplete(true)
            : setLoadingComplete(true)
        }
        onLoadingComplete={() =>
          setParentLoadingComplete
            ? setParentLoadingComplete(true)
            : setLoadingComplete(true)
        }
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.alt}
        draggable={false}
        className={`${classes || className} ${parentLoadingComplete || loadingComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${
          position === 'center' ? 'mx-auto' : ''
        } `}
        {...other}
      />
    );
  }

  return <div>Asset {type} not implemented yet</div>;
}

function ThemedImage({
  setParentLoadingComplete,
  setLoadingComplete,
  image,
  dark_image,
  classes,
  className,
  parentLoadingComplete,
  loadingComplete,
  ...other
}: {
  setParentLoadingComplete: (param: boolean) => void;
  setLoadingComplete: Dispatch<SetStateAction<boolean>>;
  image: TCommonImage;
  dark_image: TCommonImage;
  classes: string;
  className: string;
  parentLoadingComplete: boolean;
  loadingComplete: boolean;
}) {
  const { resolvedTheme } = useTheme();
  let src;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  switch (resolvedTheme) {
    case 'light':
      src = image.url;
      break;
    case 'dark':
      src = dark_image.url;
      break;
  }

  return (
    <div>
      <Image
        onLoad={() =>
          setParentLoadingComplete
            ? setParentLoadingComplete(true)
            : setLoadingComplete(true)
        }
        onLoadingComplete={() =>
          setParentLoadingComplete
            ? setParentLoadingComplete(true)
            : setLoadingComplete(true)
        }
        src={src ?? ''}
        width={image.width}
        height={image.height}
        alt={image.alt || image.title}
        draggable={false}
        className={`${classes || className} ${parentLoadingComplete || loadingComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 `}
        {...other}
      />
    </div>
  );
}

export default Asset;
