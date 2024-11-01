'use client';

// React
import { useState, useEffect } from 'react';

// Next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Icon
import { Loader2 } from 'lucide-react';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const HomeCourseShowAll = ({ maxItems }: { maxItems: string }) => {
  // Hooks
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * @description handle click load more
   *
   * @return {void}
   */
  const onClickShowAll = () => {
    push(`?courseCategory=/&maxItems=${parseInt(maxItems) + 990}`, {
      scroll: false,
    });

    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <div className='flex items-center justify-between gap-10 xl:hidden'>
      <hr className='border-navy dark:border-white/10 w-full' />
      <Button variant='white' onClick={onClickShowAll}>
        View All Courses
        {loading && <Loader2 className='ml-2 animate-spin' />}
      </Button>
      <hr className='border-navy dark:border-white/10 w-full' />
    </div>
  );
};

HomeCourseShowAll.displayName = 'HomeCourseShowAll';

export default HomeCourseShowAll;
