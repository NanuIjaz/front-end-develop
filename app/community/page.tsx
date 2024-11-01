// Next
import { Metadata } from 'next';
import dynamicComponent from 'next/dynamic';

// Api
import { fetchCommunity } from '@/api/community.api';

// Dynamic Components
const CommunityBanner = dynamicComponent(
  () => import('@/components/root/community/banner'),
);
const CommunityVision = dynamicComponent(
  () => import('@/components/root/community/vision'),
);
const CommunityJoinUs = dynamicComponent(
  () => import('@/components/root/community/join-us'),
);
const CommunityExperts = dynamicComponent(
  () => import('@/components/root/community/experts'),
);
const CommunityCta = dynamicComponent(() => import('@/components/root/cta'));

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  /**
   * @description fetch community page data
   *
   * @return {Promise<void>}
   */
  const data = await fetchCommunity();

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

const CommunityPage = async () => {
  /**
   * @description fetch community page data
   *
   * @return {Promise<void>}
   */
  const communityData = await fetchCommunity();

  return (
    <main>
      <CommunityBanner data={communityData} />

      {communityData.we_work_towards.items.length >= 1 && (
        <CommunityVision data={communityData} />
      )}

      {communityData.join_us.items.length >= 1 && (
        <CommunityJoinUs data={communityData} />
      )}

      {communityData.experts.items.length >= 1 && (
        <CommunityExperts data={communityData} />
      )}

      <CommunityCta
        title={communityData.join_area.heading}
        button={communityData.join_area.button}
      />
    </main>
  );
};

CommunityPage.displayName = 'CommunityPage';

export default CommunityPage;
