// Next
import dynamic from 'next/dynamic';

// Type
import { TElearning } from '@/types/e-learning';
import { TGeneralCountries } from '@/types/general.type';
import { TCourse, TCourseFee } from '@/types/courses.type';

// Dynamic Components
const CoursesEnrollForm = dynamic(
  () => import('@/components/root/courses/enroll/form'),
);
const ContactUsForm = dynamic(
  () => import('@/components/root/contact-us/form'),
);

const ELearningJoinWaitlist = ({
  countries,
  data,
  courseFee,
  formType,
  courseFeeInstallment,
  eLearning,
}: {
  countries: TGeneralCountries[];
  data: TCourse;
  courseFee: TCourseFee;
  formType: string;
  courseFeeInstallment: TCourseFee;
  eLearning: TElearning;
}) => {
  // Destruct Data
  const { description, heading, title } = eLearning.acf.waitlist;

  return (
    <section
      className='grid grid-cols-1 xl:grid-cols-2 xl:container items-start px-5 2xl:px-0 gap-[32px] xl:gap-[97px]'
      id='e-learning-join-waitlits'
    >
      <div className='flex flex-col items-center xl:items-start gap-6 xl:mt-[200px]'>
        <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
          {heading}
        </p>
        <h1 className='text-center xl:text-left'>{title}</h1>
        <p className='font-normal text-xs xl:text-base dark:!text-navy-200 xl:max-w-[558px] text-center xl:text-left whitespace-pre-line'>
          {description}
        </p>
      </div>

      {formType === 'form-payment' ? (
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

ELearningJoinWaitlist.displayName = 'ELearningJoinWaitlist';

export default ELearningJoinWaitlist;
