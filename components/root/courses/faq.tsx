// Next
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const CoursesFaq = () => {
  return (
    <section className='bg-navy-200 dark:bg-navy-500 flex flex-col items-center gap-10 py-20 mt-40 px-5 2xl:px-0'>
      <div className='flex flex-col items-center gap-7 max-w-[900px] text-center'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          FAQ
        </p>
        <h1>Have Questions About Our Program? Find Answers Here!</h1>
      </div>
      <Link href='/faq' target='_blank' className='w-full xl:w-fit'>
        <Button variant='white' className='w-full xl:w-fit'>
          Go to FAQs
        </Button>
      </Link>
    </section>
  );
};

CoursesFaq.displayName = 'CoursesFaq';

export default CoursesFaq;
