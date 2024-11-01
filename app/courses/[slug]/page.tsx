// Next
import { Metadata } from 'next';
import dynamicComponent from 'next/dynamic';

// Api
import {
  fetchAllCourse,
  fetchCourseFeeOnetap,
  checkCourseFormType,
  fetchCourseFeeInstallment,
} from '@/api/courses.api';
import { fetchCountries } from '@/api/general.api';

// Dynamic Component
const CoursesBanner = dynamicComponent(
  () => import('@/components/root/courses/banner'),
);
const CoursesContents = dynamicComponent(
  () => import('@/components/root/courses/contents'),
);
const CoursesFaq = dynamicComponent(
  () => import('@/components/root/courses/faq'),
);
const CoursesEnroll = dynamicComponent(
  () => import('@/components/root/courses/enroll'),
);
const Cta = dynamicComponent(() => import('@/components/root/cta'));

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  /**
   * @description fetch home page metadata
   *
   * @return {Promise<void>}
   */
  const data = await fetchAllCourse({ slug });

  return {
    title: data[0].acf.metadata.title,
    keywords: data[0].acf.metadata.keyword,
    description: data[0].acf.metadata.description,
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

const CoursesDetailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  /**
   * @description fetch detail course and countries
   *
   * @return {Promise<void>}
   */
  const [course, countries, courseFormType] = await Promise.all([
    fetchAllCourse({ slug }),
    fetchCountries(),
    checkCourseFormType(),
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
      <CoursesBanner data={course[0]} />

      {course[0].acf.course_status !== 'Coming Soon' && (
        <>
          <CoursesContents data={course[0]} courseFee={courseFeeOnetap} />

          <CoursesFaq />
        </>
      )}

      <CoursesEnroll
        countries={countries}
        data={course[0]}
        courseFee={courseFeeOnetap}
        formType={courseFormType.name}
        courseFeeInstallment={courseFeeInstallment}
      />

      <Cta
        title={course[0].acf.cta.heading}
        button={course[0].acf.cta.button}
      />
    </main>
  );
};

CoursesDetailPage.displayName = 'CoursesDetailPage';

export default CoursesDetailPage;
