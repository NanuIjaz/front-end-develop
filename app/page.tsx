// Next
import { Metadata } from 'next';
import dynamicComponent from 'next/dynamic';

// Api
import { fetchHomeData } from '@/api/home.api';
import { fetchEventAcademy } from '@/api/event.api';
import {
  fetchAllCourse,
  fetchCourseCategories,
  fetchCoursesByCategory,
} from '@/api/courses.api';

// Dynamic Component
const HomeBanner = dynamicComponent(
  () => import('@/components/root/home/banner'),
);
const HomeAbout = dynamicComponent(
  () => import('@/components/root/home/about'),
);
const HomeOurDirection = dynamicComponent(
  () => import('@/components/root/home/our-direction'),
);
const HomeCourses = dynamicComponent(
  () => import('@/components/root/home/courses'),
);
const HomeSolution = dynamicComponent(
  () => import('@/components/root/home/solution'),
);
const HomeAchievement = dynamicComponent(
  () => import('@/components/root/home/achievement'),
);
const HomeOurPartner = dynamicComponent(
  () => import('@/components/root/home/our-partner'),
);
const HomeTestimonial = dynamicComponent(
  () => import('@/components/root/home/testimonial'),
);
const HomeUpcomingEvents = dynamicComponent(
  () => import('@/components/root/home/upcoming-events'),
);
const HomeCta = dynamicComponent(() => import('@/components/root/cta'));

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  /**
   * @description fetch home page metadata
   *
   * @return {Promise<void>}
   */
  const data = await fetchHomeData();

  return {
    title: data.metadata.title,
    keywords: data.metadata.keyword,
    description: data.metadata.description,
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

const HomePage = async ({
  searchParams: { courseCategory = '/', maxItems = '9', search },
}: {
  searchParams: { courseCategory?: string; maxItems?: string; search?: string };
}) => {
  /**
   * @description fetch home page data, events academy, solutions
   *
   * @return {Promise<all>}
   */
  const [homeData, events, courseCategories, coursesByCategory, courses] =
    await Promise.all([
      fetchHomeData(),
      fetchEventAcademy({
        meta_key: 'acf/date',
        order: 'asc',
      }),
      fetchCourseCategories({
        'include[]': ['244', '243', '242'],
      }),
      fetchCoursesByCategory({
        categories: courseCategory === '/' ? '244' : courseCategory,
        maxItems: parseInt(maxItems),
        search,
      }),
      fetchAllCourse({
        categories: courseCategory === '/' ? undefined : undefined,
        maxItems: parseInt(maxItems),
        search,
      }),
    ]);

  return (
    <main>
      <HomeBanner data={homeData} />

      <HomeAbout data={homeData} />

      <HomeOurDirection data={homeData} />

      <HomeCourses
        categories={courseCategories}
        courses={courseCategory === '/' ? courses : coursesByCategory}
        maxItems={maxItems}
        description={homeData.courses_highlight.description}
        activeCategory={courseCategory}
      />

      <HomeSolution data={homeData} />

      <HomeAchievement data={homeData} />

      <HomeOurPartner data={homeData} />

      {homeData.testimonials.items.length >= 1 && (
        <HomeTestimonial data={homeData} />
      )}

      <HomeUpcomingEvents data={homeData} events={events} />

      <HomeCta
        title={homeData.discover_about_emurgo.heading}
        button={homeData.discover_about_emurgo.button}
      />
    </main>
  );
};

HomePage.displayName = 'HomePage';

export default HomePage;
