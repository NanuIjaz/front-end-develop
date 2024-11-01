// Next
import dynamicComponent from 'next/dynamic';

// Api
import {
  fetchAllCourse,
  fetchCourseFeeOnetap,
  fetchCourseFeeInstallment,
} from '@/api/courses.api';
import { fetchELearning } from '@/api/e-learning.api';
import { checkELearningType, fetchCountries } from '@/api/general.api';

// Dynamic Component
const ELearningBanner = dynamicComponent(
  () => import('@/components/root/e-learning/banner'),
);
const Cta = dynamicComponent(() => import('@/components/root/cta'));
const ELearningJoinWaitlist = dynamicComponent(
  () => import('@/components/root/e-learning/join-waitlist'),
);

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: 'EMURGO Academy | E - Learning',
    keywords: 'e-learning',
    description: 'e-learning',
    icons: {
      icon: [
        {
          url: 'https://emurgo-api.antigravity.dev/wp-content/uploads/2024/06/favicon.png',
          href: 'https://emurgo-api.antigravity.dev/wp-content/uploads/2024/06/favicon.png',
        },
      ],
    },
  };
}

const ELearningPage = async () => {
  /**
   * @description fetch detail course and countries
   *
   * @return {Promise<void>}
   */
  const [eLearning, course, countries, eLearningFormType] = await Promise.all([
    fetchELearning({}),
    fetchAllCourse({}),
    fetchCountries(),
    checkELearningType(),
  ]);

  let courseFeeOnetap = {
    course_fee: '',
    currency: '',
    success: false,
  };

  let courseFeeInstallment = {
    course_fee: '',
    currency: '',
    success: false,
  };

  courseFeeOnetap = await fetchCourseFeeOnetap(course[0].id.toString());
  courseFeeInstallment = await fetchCourseFeeInstallment(
    course[0].id.toString(),
  );

  return (
    <main>
      <ELearningBanner data={eLearning} />

      <ELearningJoinWaitlist
        data={course[0]}
        courseFee={courseFeeOnetap}
        countries={countries}
        formType={eLearningFormType.name}
        courseFeeInstallment={courseFeeInstallment}
        eLearning={eLearning}
      />

      <Cta title='Discover About Emurgo Academy' />
    </main>
  );
};

ELearningPage.displayName = 'ELearningPage';

export default ELearningPage;
