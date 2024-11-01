// Next
import { Metadata } from 'next';
import dynamicComponent from 'next/dynamic';

// Api
import { fetchEventAcademy } from '@/api/event.api';

// Dynamic Component
const EventBanner = dynamicComponent(
  () => import('@/components/root/event/banner'),
);
const EventDescription = dynamicComponent(
  () => import('@/components/root/event/description'),
);
const EventSchedule = dynamicComponent(
  () => import('@/components/root/event/schedule'),
);
const EventOther = dynamicComponent(
  () => import('@/components/root/event/other'),
);
const Cta = dynamicComponent(() => import('@/components/root/cta'));

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  /**
   * @description fetch event academy detail page data
   *
   * @return {Promise<void>}
   */
  const data = await fetchEventAcademy({ slug });

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

const EventDetailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  /**
   * @description fetch event academy detail and other events
   *
   * @return {Promise<void>}
   */
  const [eventDetail, events] = await Promise.all([
    fetchEventAcademy({ slug }),
    fetchEventAcademy({
      meta_key: 'date',
      order: 'desc',
    }),
  ]);

  return (
    <main>
      <EventBanner data={eventDetail[0]} />

      <EventDescription data={eventDetail[0]} />

      {eventDetail[0].acf.schedule.length >= 1 && (
        <EventSchedule data={eventDetail[0]} />
      )}

      <EventOther data={events} slug={slug} />

      <Cta
        title={eventDetail[0]?.acf?.cta?.heading}
        button={eventDetail[0]?.acf?.cta?.button}
      />
    </main>
  );
};

EventDetailPage.displayName = 'EventDetailPage';

export default EventDetailPage;
