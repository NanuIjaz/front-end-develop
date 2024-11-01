'use client';

// React
import { KeyboardEventHandler, useState, useEffect } from 'react';

// Next
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

// Icon
import { Search } from 'lucide-react';

// Dynamic Component
const Input = dynamic(() =>
  import('@/components/ui/input').then((buttons) => buttons.Input),
);

const FaqSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [searchValue, setSearchValue] = useState<string>('');

  /**
   * @description handle enter click
   *
   * @param e
   */
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      searchTopic();
    }
  };

  const searchTopic = () => {
    if (searchValue) router.push(`/faq?search=${searchValue}`);
    else router.push(`/faq`);
  };

  useEffect(() => {
    if (search) setSearchValue(search);
    else setSearchValue('');
  }, [search]);

  return (
    <div className='relative text-center'>
      <Input
        className='pl-14 w-[363px] h-14 dark:border-navy-100/10'
        placeholder='Search Question'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Search className='absolute top-0 bottom-0 w-6 h-6 my-auto left-5 cursor-pointer' />
    </div>
  );
};

FaqSearch.displayName = 'FaqSearch';

export default FaqSearch;
