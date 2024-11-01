// Next
import dynamicComponent from 'next/dynamic';

// Dynamic Components
const ThankYouBanner = dynamicComponent(
  () => import('@/components/root/thank-you/banner'),
);
const ThankYouCta = dynamicComponent(() => import('@/components/root/cta'));

export const dynamic = 'force-dynamic';

const ThankYouPage = () => {
  return (
    <main>
      <ThankYouBanner />

      <ThankYouCta title='Learn more about EMURGO Academy' />
    </main>
  );
};

ThankYouPage.displayName = 'ThankYouPage';

export default ThankYouPage;
