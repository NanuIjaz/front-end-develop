const arrow = () => {
  return (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.5 4.86842H1.42893'
        stroke='currentColor'
        strokeLinecap='round'
        className='opacity-0 transition-all group-hover:opacity-100'
      />
      <path
        d='M5 1L8.86842 4.86842L5 8.73684'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='-translate-x-1 transition-all group-hover:translate-x-0'
      />
    </svg>
  );
};

arrow.displayName = 'arrow';

export default arrow;
