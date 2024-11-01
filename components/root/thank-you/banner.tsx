// Next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Image
import Checked from '@/public/image/checked.png';
import Circle from '@/public/image/circle.png';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const ThankYouBanner = () => {
  return (
    <section className='dark:bg-[#01222D]'>
      <div className='h-[600px] flex flex-col items-center justify-center relative xl:container px-5 2xl:px-0 py-16 gap-8'>
        <Image
          src={Checked}
          alt='Checked'
          priority
          quality={100}
          width={116}
          height={116}
        />
        <h1 className='font-bold text-[40px] text-center'>
          Payment Succesfull
        </h1>
        <div className='flex flex-col gap-2 items-center'>
          <p className='font-normal text-xs xl:text-base text-center'>
            Payment successfully completed! you can check your email for the
            details
          </p>
          <p className='font-normal text-xs xl:text-base text-center'>
            Thank you for purchasing.
          </p>
        </div>
        <Link href='/' scroll={false} className='w-full xl:w-fit'>
          <Button variant='white' className='w-full xl:w-fit'>
            Back to Home
          </Button>
        </Link>

        <Image
          src={Circle}
          alt='Circle'
          priority
          quality={100}
          width={48}
          height={48}
          className='absolute left-[20%] top-[50%] hidden xl:block'
        />
        <Image
          src={Circle}
          alt='Circle'
          priority
          quality={100}
          width={48}
          height={48}
          className='absolute right-[20%] top-[10%] hidden xl:block'
        />
      </div>
    </section>
  );
};

ThankYouBanner.displayName = 'ThankYouBanner';

export default ThankYouBanner;
