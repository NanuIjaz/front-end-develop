'use client';

// React
import { KeyboardEventHandler, useState, useEffect } from 'react';

// Next
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

// Icon
import { Search, X } from 'lucide-react';

// Dynamic Component
const Input = dynamic(() =>
  import('@/components/ui/input').then((inputs) => inputs.Input),
);

const HomeCoursesSearch = () => {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const courseCategory = searchParams.get('courseCategory');
  const maxItems = searchParams.get('maxItems');
  const [searchValue, setSearchValue] = useState<string>('');

  /**
   * @description handle enter click
   *
   * @param e
   */
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      searchCourse();
    }
  };

  /**
   * @description handle search
   *
   * @return {void}
   */
  const searchCourse = () => {
    if (searchValue)
      router.push(
        `?courseCategory=${courseCategory ?? 1}&search=${searchValue}&maxItems=${maxItems ?? 6}`,
        {
          scroll: false,
        },
      );
    else clearSearch();
  };

  /**
   * @description handle clear search
   *
   * @return {void}
   */
  const clearSearch = () => {
    router.push(
      `?courseCategory=${courseCategory ?? 1}&maxItems=${maxItems ?? 6}`,
      {
        scroll: false,
      },
    );
  };

  useEffect(() => {
    if (search) setSearchValue(search);
    else setSearchValue('');
  }, [search]);

  return (
    <div className='relative text-center w-full xl:w-fit order-1 xl:order-2'>
      <Input
        className='pl-14 min-w-full xl:w-[363px] h-14 dark:border-navy-100/10'
        placeholder='Search course'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Search className='absolute top-0 bottom-0 w-6 h-6 my-auto left-5 cursor-pointer' />
      {search && (
        <X
          className='absolute top-0 bottom-0 w-6 h-6 my-auto right-5 cursor-pointer'
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

HomeCoursesSearch.displayName = 'HomeCoursesSearch';

export default HomeCoursesSearch;
