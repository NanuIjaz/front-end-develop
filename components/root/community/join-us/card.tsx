'use client';

// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Type
import { TCommunityJoinUsItem } from '@/types/community.type';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const CommunityJoinUsCard = ({ data }: { data: TCommunityJoinUsItem }) => {
  // Hook
  const { theme } = useTheme();
  const mode = theme === 'light' ? 'light_mode' : 'dark_mode';

  const { tittle, icon, description, button } = data;

  return (
    <div
      className='rounded-xs py-6 px-4 bg-navy-500/20 flex flex-col gap-4 h-full'
      key={tittle}
    >
      <div className='flex items-center gap-4'>
        <Image
          src={icon[mode].url}
          alt='Discord'
          priority
          quality={100}
          width={56}
          height={56}
          className='object-cover'
        />
        <h3>{tittle}</h3>
      </div>
      <p className='font-normal text-base'>{description}</p>
      <Link href={button.url.url ?? '#'} target='_blank'>
        <Button className='w-fit' variant='white'>
          {button.label ?? ''}
        </Button>
      </Link>
    </div>
  );
};

CommunityJoinUsCard.displayName = 'CommunityJoinUsCard';

export default CommunityJoinUsCard;
