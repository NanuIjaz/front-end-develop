// Next
import Link from 'next/link';

// Type
import { TContactUsPage } from '@/types/contact-us.type';

const ContactUsEmailUs = ({ data }: { data: TContactUsPage }) => {
  return (
    <section className='py-20 flex flex-col gap-6 xl:container px-5 2xl:px-0 items-center'>
      <h2>{data.email_us.title}</h2>
      <p className='text-xs xl:text-base dark:!text-navy-200'>
        For general or course-related inquiries:{' '}
        <Link
          className='!text-orange underline'
          href={`mailto:${data.email_us['for_general_or_course-related_inquiries:']}`}
        >
          {data.email_us['for_general_or_course-related_inquiries:']}
        </Link>
      </p>
      <p className='text-xs xl:text-base dark:!text-navy-200'>
        For SmartBlocks information:{' '}
        <Link
          className='!text-orange underline'
          href={`mailto:${data.email_us['for_smartblocks_information:']}`}
        >
          {data.email_us['for_smartblocks_information:']}
        </Link>
      </p>
    </section>
  );
};

ContactUsEmailUs.displayName = 'ContactUsEmailUs';

export default ContactUsEmailUs;
