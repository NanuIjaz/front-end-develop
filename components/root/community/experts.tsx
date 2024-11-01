// Next
import Image from 'next/image';

// Type
import { TCommunity } from '@/types/community.type';

const CommunityExperts = ({ data }: { data: Pick<TCommunity, 'experts'> }) => {
  const { heading, items, description } = data.experts;

  return (
    <section className='xl:container flex flex-col gap-6 items-center !pt-28 px-5 2xl:px-0'>
      <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest max-w-4xl text-center'>
        EMURGO ACADEMY COMMUNITY STEERING COMMITEE
      </p>
      <h2 className='text-center text-2xl xl:text-[32px] xl:max-w-4xl'>
        {heading}
      </h2>
      <p className='font-normal dark:!text-navy-200 text-sm xl:text-base text-center xl:max-w-5xl font-aeonik'>
        {description}
      </p>
      <div className='flex flex-wrap items-center justify-center gap-y-16 mt-4 w-full'>
        {items.map((item) => (
          <div
            className='flex flex-col gap-6 items-center w-full xl:w-1/3'
            key={item.name}
          >
            <Image
              src={item.image.url}
              priority
              quality={100}
              alt='Instructors Image'
              width={380}
              height={380}
              className='rounded-xs object-cover w-[380px] h-[380px] object-center'
            />
            <div className='flex flex-col gap-4 items-center'>
              <h4>{item.name}</h4>
              <span className='label-s !text-[#667E86] dark:!text-navy-200'>
                {item.position}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

CommunityExperts.displayName = 'CommunityExperts';

export default CommunityExperts;
