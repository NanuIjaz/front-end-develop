// Next
import dynamic from 'next/dynamic';

// Api
import { fetchHeaders, fetchNavigation } from '@/api/general.api';
import { fetchCourseCategories } from '@/api/courses.api';

// Dynamic Components
const HeaderContent = dynamic(() => import('@/components/root/header/content'));

const RootHeader = async () => {
  /**
   * @description fetch headers, course categories data
   *
   * @return {Promise<void>}
   */
  const [headers, courseCategories, navigation] = await Promise.all([
    fetchHeaders(),
    fetchCourseCategories({
      'include[]': ['244', '243', '242'],
    }),
    fetchNavigation(),
  ]);

  return (
    <HeaderContent
      headers={headers}
      courseCategories={courseCategories}
      navigation={navigation}
    />
  );
};

RootHeader.displayName = 'RootHeader';

export default RootHeader;
