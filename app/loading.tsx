// Icon
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='min-w-screen flex items-center justify-center min-h-screen dark:bg-navy-700 max-sm:-mt-44 max-xl:-mt-16'>
      <div className='flex items-center justify-center gap-2'>
        <Loader2 className='h-10 w-10 animate-spin text-orange' />
        <p className='text-navy-500 dark:text-white'>Loading...</p>
      </div>
    </div>
  );
};

Loading.displayName = 'Loading';

export default Loading;
