// Next
import Image from 'next/image';

// Type
import { TCommunity } from '@/types/community.type';

const CommunityInstructors = ({
  data,
}: {
  data: Pick<TCommunity, 'instructors'>;
}) => {
  const { heading, items } = data.instructors;

  return (
    <section className='xl:container flex flex-col gap-6 items-center !pt-14 px-5 2xl:px-0'>
      <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest max-w-4xl'>
        ACADEMIC INSTRUCTORS
      </p>
      <h2 className='text-center text-2xl xl:text-[32px] xl:max-w-4xl'>
        {heading}
      </h2>
      <div className='flex flex-wrap items-center justify-center gap-y-6 xl:gap-y-16 mt-4 w-full gap-x-5'>
        {items.map((item) => (
          <div className='flex flex-col gap-6 items-center' key={item.name}>
            <Image
              src={item.image.url}
              priority
              quality={100}
              alt='Instructors Image'
              width={380}
              height={380}
              className='rounded-xs'
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

CommunityInstructors.displayName = 'CommunityInstructors';

export default CommunityInstructors;
