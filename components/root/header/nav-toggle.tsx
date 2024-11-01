// Framer Motion
import { motion } from 'framer-motion';

export default function NavToggle({
  isNavActive,
  setIsNavActive,
}: {
  isNavActive: boolean;
  setIsNavActive: (val: boolean) => void;
}) {
  return (
    <button
      className='outline-none focus:outline-none'
      type='button'
      onClick={() => setIsNavActive(!isNavActive)}
      aria-label='Open Nav'
    >
      <svg
        className='w-14 md:w-16'
        viewBox='0 0 64 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='0.5'
          y='0.5'
          width='63'
          height='35'
          rx='17.5'
          className='fill-navy-700 transition-colors dark:fill-white'
        />
        <motion.path
          initial={false}
          animate={{ x: isNavActive ? '100%' : '0%' }}
          d='M20.4709 14H43.5291'
          className='stroke-white transition-colors dark:stroke-navy-700'
          strokeLinecap='round'
        />
        <path
          d='M20.4709 18H43.5291'
          className='stroke-white transition-colors dark:stroke-navy-700'
          strokeLinecap='round'
        />
        <motion.path
          initial={false}
          animate={{ x: isNavActive ? '-100%' : '0%' }}
          d='M20.4709 22H43.5291'
          className='stroke-white transition-colors dark:stroke-navy-700'
          strokeLinecap='round'
        />
      </svg>
    </button>
  );
}
