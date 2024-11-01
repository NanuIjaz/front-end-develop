import { Metadata } from 'next';
import dynamicComponent from 'next/dynamic';

// Api
import { fetchContactUs } from '@/api/contact-us.api';

// Dynamic Components
const ContactUsBanner = dynamicComponent(
  () => import('@/components/root/contact-us/banner'),
);
const ContactUsLocation = dynamicComponent(
  () => import('@/components/root/contact-us/location'),
);
const ContactUsEmailUs = dynamicComponent(
  () => import('@/components/root/contact-us/email-us'),
);
const ContactUsCta = dynamicComponent(() => import('@/components/root/cta'));

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  /**
   * @description fetch home page metadata
   *
   * @return {Promise<Metadata>}
   */
  const data = await fetchContactUs();

  return {
    title: data.meta_data.title,
    keywords: data.meta_data.keyword,
    description: data.meta_data.description,
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

const ContactUsPage = async () => {
  /**
   * @description Fetch contact us page data
   *
   * @return {JSX.Element}
   */
  const contactUs = await fetchContactUs();

  return (
    <main>
      <ContactUsBanner data={contactUs} />

      <ContactUsLocation data={contactUs} />

      <ContactUsEmailUs data={contactUs} />

      <ContactUsCta
        title={contactUs.cta.heading}
        button={contactUs.cta.button}
      />
    </main>
  );
};

ContactUsPage.displayName = 'ContactUsPage';

export default ContactUsPage;
