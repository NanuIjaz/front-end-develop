// Next
import Image from 'next/image';

// Type
import { TCommonImage } from '@/types/common.type';

const WpImage = ({
  image,
  fill = false,
  priority = false,
  className,
  ...props
}: {
  image: TCommonImage;
  fill?: boolean;
  priority: boolean;
  className: string;
}) => {
  if (!image || !image.url) return null;

  if (fill) {
    return (
      <Image
        src={image.url}
        alt={image.alt || image.title}
        priority={priority}
        fill={fill}
        loading={!priority ? 'lazy' : undefined}
        className={className ?? ''}
        {...props}
      />
    );
  }
  return (
    <Image
      src={image.url}
      width={image.width}
      height={image.height}
      alt={image.alt || image.title}
      priority={priority}
      loading={!priority ? 'lazy' : undefined}
      className={className ?? ''}
      {...props}
    />
  );
};

WpImage.displayName = 'WpImage';

export { WpImage };
