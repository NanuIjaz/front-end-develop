// Next
import dynamic from 'next/dynamic';

// Type
import { THomeData } from '@/types/home.type';

// Dynamic Components
const HomeCarouselTestimonial = dynamic(
  () => import('@/components/root/home/carousel/testimonial-carousel'),
);

const HomeTestimonial = ({ data }: { data: THomeData }) => {
  const { items } = data.testimonials;

  return (
    <section className='bg-navy-50 dark:bg-navy-500 mt-28'>
      <HomeCarouselTestimonial items={items} />
    </section>
  );
};

HomeTestimonial.displayName = 'HomeTestimonial';

export default HomeTestimonial;
