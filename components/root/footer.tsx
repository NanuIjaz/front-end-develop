// Next
import dynamic from 'next/dynamic';

// Api
import { fetchFooters } from '@/api/general.api';

// Dynamic Components
const RootFooterContent = dynamic(() => import('./footer/content'));

const RootFooter = async () => {
  /**
   * @description fetch footers data
   *
   * @return {Promise<void>}
   */
  const footers = await fetchFooters();

  return (
    <footer className='lg:container px-5 2xl:px-0 mt-20' id='footer'>
      <RootFooterContent footers={footers} />
    </footer>
  );
};

RootFooter.displayName = 'RootFooter';

export default RootFooter;
