// Next
import { Metadata } from 'next';
import dynamicComponent from 'next/dynamic';

// Api
import { fetchSolutions } from '@/api/solution.api';

// Dynamic Components
const SolutionsBanner = dynamicComponent(
  () => import('@/components/root/solutions/banner'),
);
const SolutionsVision = dynamicComponent(
  () => import('@/components/root/solutions/vision'),
);
const SolutionsOurPartner = dynamicComponent(
  () => import('@/components/root/solutions/our-partner'),
);
const SolutionsIntroduction = dynamicComponent(
  () => import('@/components/root/solutions/introduction'),
);
const SolutionKeyFeature = dynamicComponent(
  () => import('@/components/root/solutions/key-features'),
);
const SolutionAmbassadors = dynamicComponent(
  () => import('@/components/root/solutions/ambassadors'),
);
const SolutionsJoinUs = dynamicComponent(
  () => import('@/components/root/solutions/join-us'),
);
const SolutionDetailCta = dynamicComponent(
  () => import('@/components/root/cta'),
);

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  /**
   * @description fetch community page data
   *
   * @return {Promise<void>}
   */
  const data = await fetchSolutions({ slug });

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

const SolutionDetailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  /**
   * @description Fetch solution detail by slug
   *
   * @return {Promise<all>}
   */
  const solutionDetail = await fetchSolutions({ slug });

  return (
    <main>
      <SolutionsBanner data={solutionDetail[0]} />
      <SolutionsVision data={solutionDetail[0]} />
      <SolutionsOurPartner data={solutionDetail[0]} />
      {solutionDetail[0].acf.introduction_video.video_url.url && (
        <SolutionsIntroduction data={solutionDetail[0]} />
      )}
      <SolutionKeyFeature data={solutionDetail[0]} />
      <SolutionAmbassadors data={solutionDetail[0]} />
      <SolutionsJoinUs data={solutionDetail[0]} />
      <SolutionDetailCta
        title={solutionDetail[0].acf.cta.heading}
        button={solutionDetail[0].acf.cta.button}
      />
    </main>
  );
};

SolutionDetailPage.displayName = 'SolutionDetailPage';

export default SolutionDetailPage;
