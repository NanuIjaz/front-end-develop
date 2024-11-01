// Next
import dynamic from 'next/dynamic';

// Image

// Type
import { TCommunity } from '@/types/community.type';

// Dynamic Components
const CommunityJoinUsCard = dynamic(
  () => import('@/components/root/community/join-us/card'),
);

const CommunityJoinUs = ({ data }: { data: Pick<TCommunity, 'join_us'> }) => {
  const { heading, description, items } = data.join_us;
  const words = heading.split(' ');

  const firstHalf = words.slice(0, 1).join(' ');
  const secondHalf = words.slice(1).join(' ');

  return (
    <section className='xl:container flex flex-col items-center gap-8 !pt-20 !pb-14 px-5 2xl:px-0'>
      <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
        Join us
      </p>
      <h1>
        {firstHalf}{' '}
        <span className='text-navy-400 dark:!text-white/50'>{secondHalf}</span>
      </h1>
      <p className='text-center text-base font-normal !text-[#667E86] dark:!text-navy-200 max-w-4xl whitespace-pre-line'>
        {description}
      </p>
      <div className='w-full h-px !border-b-[#0029361A] dark:border-white/10'></div>
      <div className='grid grid-cols-1 xl:grid-cols-[repeat(auto-fit,_31%)] gap-5 items-center w-full justify-center'>
        {items.map((item) => (
          <CommunityJoinUsCard key={item.tittle} data={item} />
        ))}
      </div>
    </section>
  );
};

CommunityJoinUs.displayName = 'CommunityJoinUs';

export default CommunityJoinUs;
