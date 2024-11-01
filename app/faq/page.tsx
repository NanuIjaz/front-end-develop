// Next
import { Metadata } from 'next';
import dynamicComponent from 'next/dynamic';

// Api
import { fetchFaqPage } from '@/api/faq.api';

// Dynamic Components
const FaqBanner = dynamicComponent(
  () => import('@/components/root/faq/banner'),
);
const FaqTopic = dynamicComponent(() => import('@/components/root/faq/topic'));
const FaqCta = dynamicComponent(() => import('@/components/root/cta'));

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  /**
   * @description fetch faq page
   *
   * @return {Promise<void>}
   */
  const data = await fetchFaqPage();

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

const FaqPage = async () => {
  /**
   * @description fetch faq page
   *
   * @return {Promise<void>}
   */
  const faq = await fetchFaqPage();

  return (
    <main>
      <FaqBanner data={faq} />

      <FaqTopic data={faq} />

      <FaqCta title={faq.heading.heading} button={faq.heading.button} />
    </main>
  );
};

FaqPage.displayName = 'FaqPage';

export default FaqPage;
