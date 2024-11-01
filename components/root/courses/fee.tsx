// Next
import Image from 'next/image';

// Image
import Circle from '@/public/image/circle.png';
import Check from '@/public/image/check-circle.png';
import CourseFee from '@/public/image/course-fee.png';

// Type
import { TCourse, TCourseFee } from '@/types/courses.type';

// Libs
import { currencyFormat } from '@/lib/utils';

const BenefitItem = ({ benefits }: { benefits: { item: string }[] }) =>
  benefits.map(({ item }) => (
    <div className='flex gap-2' key={item}>
      <Image
        src={Check}
        alt='Check'
        priority
        quality={100}
        width={24}
        height={24}
        className='aspect-square h-fit'
      />
      <p className='font-medium text-base'>{item}</p>
    </div>
  ));

const FeeOption = ({
  title,
  fee,
  benefits,
  currency,
}: {
  title: string;
  fee: string;
  benefits: { item: string }[];
  currency: string;
}) => (
  <div className='w-full p-6 flex flex-col col-span-2 xl:col-span-1 gap-4 dark:bg-[#0A313E] hover:linear-fee dark:border-none border rounded-xs'>
    <Image
      src={CourseFee}
      alt='Course Fee Illustration'
      priority
      quality={100}
      width={223}
      height={223}
      unoptimized
      className='aspect-square'
    />
    <div className='flex flex-col gap-4 justify-center h-full'>
      <p className='uppercase text-xs xl:text-base xl:!text-navy-200'>
        {title}
      </p>
      <h2 className='xl:text-[36px]'>
        {['0', ''].includes(fee)
          ? 'Free'
          : currencyFormat(parseInt(fee), currency)}
      </h2>
      {benefits.length >= 1 && <BenefitItem benefits={benefits} />}
    </div>
  </div>
);

const CoursesFee = ({
  data,
  courseFee,
}: {
  data: TCourse;
  courseFee: TCourseFee;
}) => {
  const { installment, onetap } = data.acf.course_fee;
  const hasInstallmentFee = !['0', 0, null].includes(installment.fee);
  const hasOneTapFee = !['0', 0, null].includes(onetap.fee);

  return (
    <section className='flex flex-col gap-8 relative' id='course_fee'>
      <div className='flex flex-col gap-6'>
        <p className='font-medium dark:!text-navy-200 text-navy-400 uppercase text-xs'>
          Course fee
        </p>
        <h2 className='text-2xl xl:text-[32px]'>
          Tuition details: What You Need to Know
        </h2>
      </div>
      <div className='grid grid-cols-2 gap-10'>
        {hasInstallmentFee && hasOneTapFee ? (
          <>
            <FeeOption
              title='One-time payment option'
              fee={onetap.fee}
              benefits={onetap.benefit}
              currency={courseFee.currency}
            />
            <FeeOption
              title='Installment payment option'
              fee={installment.fee}
              benefits={installment.benefit}
              currency={courseFee.currency}
            />
          </>
        ) : (
          <div className='w-full p-6 flex flex-col xl:flex-row gap-4 dark:bg-[#0A313E] dark:border-none border col-span-2 rounded-xs'>
            <Image
              src={CourseFee}
              alt='Course Fee Illustration'
              priority
              quality={100}
              width={220}
              height={220}
              className='aspect-square'
            />
            <div className='flex flex-col gap-4 justify-center h-full'>
              <h2 className='text-[36px]'>
                {['0', ''].includes(onetap.fee)
                  ? 'Free'
                  : currencyFormat(parseInt(onetap.fee), courseFee.currency)}
              </h2>
              {onetap.benefit.length >= 1 && (
                <BenefitItem benefits={onetap.benefit} />
              )}
            </div>
          </div>
        )}
      </div>

      <Image
        src={Circle}
        alt='Circle Illustration'
        priority
        height={40}
        width={40}
        unoptimized
        className='h-[40px] w-auto absolute right-[-30px] top-[50%] hidden xl:block aspect-square'
      />
    </section>
  );
};

CoursesFee.displayName = 'CoursesFee';

export default CoursesFee;
