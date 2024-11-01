// Next
import Image from 'next/image';

// Type
import { THomeData } from '@/types/home.type';
import { TCommonImage } from '@/types/common.type';

const HomeOurPartner = ({ data }: { data: THomeData }) => {
  const { heading, logo_partner } = data.partner;

  return (
    <section className='mt-36'>
      <div className='flex flex-col gap-6 w-full items-center px-5 2xl:px-0'>
        <h2 className='text-2xl xl:text-[32px]'>{heading}</h2>
        {logo_partner.length >= 1 && (
          <div className='flex items-center gap-6 flex-wrap justify-center mt-8 relative w-full'>
            <div className='absolute w-[317px] h-full left-0 !bg-gradient-to-r from-white dark:from-navy-700 from-10% !to-transparent z-50 hidden xl:block'></div>
            <div className='flex flex-wrap gap-5 items-center justify-center xl:hidden'>
              {logo_partner
                .filter(
                  (partners): partners is { image: TCommonImage } =>
                    partners.image !== false,
                )
                .map((partner, index) => (
                  <div className='h-fit w-fit relative' key={partner.image.id}>
                    <Image
                      src={partner.image.url}
                      alt={`Partner ${index}`}
                      priority
                      width={partner.image.width}
                      height={partner.image.height}
                      quality={100}
                      unoptimized
                      className='w-auto h-auto max-h-[45px] object-cover aspect-auto'
                    />
                  </div>
                ))}
            </div>
            <div className='flex-wrap justify-center 2xl:!gap-x-[42px] xl:!gap-x-[90px] gap-y-8 hidden xl:flex'>
              {logo_partner
                .filter(
                  (partners): partners is { image: TCommonImage } =>
                    partners.image !== false,
                )
                .map((partner, index) => (
                  <div
                    key={partner.image.id}
                    className='flex-shrink-0 w-[calc(20%-2rem)] flex justify-center items-center'
                  >
                    <Image
                      src={partner.image.url}
                      alt={`Partner ${index}`}
                      quality={100}
                      priority
                      width={partner.image.width}
                      height={partner.image.height}
                      unoptimized
                      className='w-auto h-hit object-cover aspect-auto max-h-[132px] max-w-[292px]'
                    />
                  </div>
                ))}
            </div>

            <div className='absolute w-[317px] h-full right-0 !bg-gradient-to-l from-white dark:from-navy-700 from-10% !to-transparent z-50 hidden xl:block'></div>
          </div>
        )}
      </div>
    </section>
  );
};

HomeOurPartner.displayName = 'HomeOurPartner';

export default HomeOurPartner;
