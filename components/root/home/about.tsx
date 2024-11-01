// Type
import { THomeData } from '@/types/home.type';

const HomeAbout = ({ data }: { data: Pick<THomeData, 'about_academy'> }) => {
  const { description } = data.about_academy;

  return (
    <section
      className='xl:container py-16 xl:!py-40 flex flex-col max-sm:items-center gap-8 px-5 2xl:px-0'
      id='about-us'
    >
      <p className='uppercase font-normal text-xs dark:!text-navy-200 tracking-widest'>
        ABOUT ACADEMY
      </p>
      <h1 className='xl:text-4xl max-sm:text-center'>{description}</h1>
    </section>
  );
};

HomeAbout.displayName = 'HomeAbout';

export default HomeAbout;
