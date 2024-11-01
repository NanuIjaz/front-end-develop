'use client';

// Next
import dynamic from 'next/dynamic';

// Next
import { useRouter, useSearchParams } from 'next/navigation';

// Dynamic Components
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);

const HomeCoursesPagination = ({ maxItems }: { maxItems: string }) => {
  // Hooks
  const { push } = useRouter();
  const searchparams = useSearchParams();

  /**
   * @description handle click load more
   *
   * @return {void}
   */
  const onClickLoadMore = () => {
    push(
      `?courseCategory=${searchparams.get('courseCategory')}&maxItems=${parseInt(maxItems) + 3}`,
      { scroll: false },
    );
  };

  return (
    <div className='flex items-center justify-between gap-10'>
      <hr className='border-navy dark:border-white/10 w-full' />
      <Button variant='white' onClick={onClickLoadMore}>
        Load More
      </Button>
      <hr className='border-navy dark:border-white/10 w-full' />
    </div>
  );
};

HomeCoursesPagination.displayName = 'HomeCoursesPagination';

export default HomeCoursesPagination;
