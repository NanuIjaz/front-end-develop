// Type
import { TCommunity } from '@/types/community.type';

const CommunityVision = ({
  data,
}: {
  data: Pick<TCommunity, 'we_work_towards'>;
}) => {
  return (
    <section className='bg-navy-50 dark:bg-navy-600 pt-16 pb-24 !min-w-screen'>
      <div className='xl:container flex flex-col gap-5 xl:gap-10 px-5 2xl:px-0'>
        <h2>Community objectives</h2>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5 items-center h-full'>
          {data.we_work_towards.items.slice(0, 2).map((item, index) => (
            <div
              className='bg-navy-500/20 rounded-xs py-9 px-5 flex flex-col gap-4 h-full justify-center'
              key={item.description}
            >
              <p className='font-medium text-xl dark:!text-navy-300'>
                0{index + 1}
              </p>
              <h3 className='leading-[28.8px]'>{item.description}</h3>
            </div>
          ))}
          <div className='hidden xl:block'></div>
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5 items-center'>
          <div className='hidden xl:block'></div>
          {data.we_work_towards.items.slice(2, 4).map((item, index) => (
            <div
              className='bg-navy-500/20 rounded-xs py-9 px-5 flex flex-col gap-4 h-full justify-center'
              key={item.description}
            >
              <p className='font-medium text-xl dark:!text-navy-300'>
                0{index + 3}
              </p>
              <h3 className='leading-[28.8px]'>{item.description}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

CommunityVision.displayName = 'CommunityVision';

export default CommunityVision;
