// Next
import { redirect } from 'next/navigation';

// Api
import { fetchAllCourse } from '@/api/courses.api';

export const dynamic = 'force-dynamic';

const CoursesPage = async () => {
  /**
   * @description fetch all course
   *
   * @return {Promise<void>}
   */
  const courses = await fetchAllCourse({ maxItems: 999 });

  if (courses.length >= 1) redirect(`/courses/${courses[0].slug}`);
  else redirect('/');
};

CoursesPage.displayName = 'CoursesPage';

export default CoursesPage;
