// Next
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Type
import { TCourse, TCourseFee } from '@/types/courses.type';
import { TGeneralCountries } from '@/types/general.type';

// Constants
import { COURSE_STATUSES } from '@/constants/course.constant';

// Dynamic Components
const CoursesEnrollForm = dynamic(
  () => import('@/components/root/courses/enroll/form'),
);
const ContactUsForm = dynamic(
  () => import('@/components/root/contact-us/form'),
);
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const CoursesEnroll = ({
  countries,
  data,
  courseFee,
  formType,
  courseFeeInstallment,
}: {
  countries: TGeneralCountries[];
  data: TCourse;
  courseFee: TCourseFee;
  formType: string;
  courseFeeInstallment: TCourseFee;
}) => {
  const { title, description, button } = data.acf.enroll;

  return (
    <section
      className='grid grid-cols-1 xl:grid-cols-2 xl:container pt-44 px-5 2xl:px-0 gap-[70px] xl:gap-[97px]'
      id='enroll'
    >
      <div className='flex flex-col items-center xl:items-start gap-8'>
        <p className='font-medium dark:text-navy-200 text-navy-400 uppercase text-xs text-center xl:text-left tracking-widest'>
          {data.acf.course_status !== COURSE_STATUSES.COMING_SOON
            ? 'Enroll'
            : 'Waitlist'}
        </p>
        <div className='flex flex-col items-center xl:items-start gap-6'>
          <h1 className='text-center xl:text-left'>
            {data.acf.course_status !== COURSE_STATUSES.COMING_SOON
              ? title
              : 'Join the Waitlist'}
          </h1>
          <p className='font-normal whitespace-pre-line dark:!text-navy-200 text-sm xl:text-base text-center xl:text-left max-w-[558px]'>
            {data.acf.course_status !== COURSE_STATUSES.COMING_SOON
              ? description
              : 'Join our waitlist to be the first to receive details of our E-Learning program.'}
          </p>
          {button.label && (
            <Link
              href={button.url.url ?? '#'}
              target='_blank'
              className='w-full xl:w-fit'
            >
              <Button variant='white' className='w-full xl:w-fit'>
                {button.label}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {formType === 'form-payment' &&
      data.acf.course_status !== COURSE_STATUSES.COMING_SOON ? (
        <CoursesEnrollForm
          countries={countries}
          data={data}
          courseFee={courseFee}
          courseFeeInstallment={courseFeeInstallment}
        />
      ) : (
        <ContactUsForm />
      )}
    </section>
  );
};

CoursesEnroll.displayName = 'CoursesEnroll';

export default CoursesEnroll;
