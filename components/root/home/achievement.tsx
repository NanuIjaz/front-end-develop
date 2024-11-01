// Next
import Image from 'next/image';

// Image
import Circle from '@/public/image/circle.png';

// Libs
import { currencyFormat } from '@/lib/utils';

// Type
import { THomeData } from '@/types/home.type';

const HomeAchievement = ({ data }: { data: THomeData }) => {
  const { heading, description, achivement_items } = data.achivement;
  return (
    <section>
      <div className='flex flex-col xl:flex-row gap-8 xl:gap-0 justify-between items-center xl:container relative px-5 2xl:px-0'>
        <div className='flex flex-col gap-8 max-w-2xl'>
          <div className='flex flex-col gap-6'>
            <Image
              src={Circle}
              alt='Circle'
              priority
              quality={100}
              width={40}
              height={37}
              className='hidden xl:block'
            />
            <p className='uppercase font-normal text-xs !text-navy-400 dark:!text-navy-200 tracking-widest'>
              ACHIEVEMENTS
            </p>
            <h2 className='text-2xl xl:text-[32px]'>{heading}</h2>
          </div>
          <p className='text-navy-400 dark:text-navy-200 body-m'>
            {description}
          </p>
        </div>
        {achivement_items.length >= 1 && (
          <div className='flex flex-col gap-8 w-full xl:w-fit'>
            {achivement_items.map((achievement) => (
              <div
                className='bg-navy-50 dark:bg-navy-500/10 flex flex-col xl:flex-row justify-between xl:items-center px-4 py-6 xl:p-7 rounded-xs min-h-[160px] gap-11 min-w-max xl:min-w-fit'
                key={achievement.label}
              >
                <div className='flex flex-col gap-6 order-2 xl:order-1'>
                  <h2 className='text-[44px] order-2 xl:order-1'>
                    {currencyFormat(parseInt(achievement.number), 'JPY', false)}{' '}
                    <span className='!text-transparent bg-clip-text bg-[linear-gradient(252.44deg,var(--tw-gradient-stops))] from-red from-10% to-yellow'>
                      +
                    </span>
                  </h2>
                  <p className='body-l !text-navy-400 dark:!text-navy-200 order-3 xl:order-2'>
                    {achievement.label}
                  </p>
                </div>
                {achievement.image && (
                  <Image
                    priority
                    src={achievement.image.url}
                    alt='Globe'
                    width={160}
                    height={160}
                    quality={100}
                    className='order-1 xl:order-2'
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <Image
          src={Circle}
          alt='Circle'
          priority
          quality={100}
          width={40}
          height={37}
          className='absolute bottom-8 left-10 hidden xl:block'
        />
        <Image
          src={Circle}
          alt='Circle'
          priority
          quality={100}
          width={40}
          height={37}
          className='absolute top-52 left-[50%] hidden xl:block'
        />
      </div>
    </section>
  );
};

HomeAchievement.displayName = 'HomeAchievement';

export default HomeAchievement;
