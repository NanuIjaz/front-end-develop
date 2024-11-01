// Next
import { forwardRef } from 'react';

const IconChevronRight = forwardRef((props) => {
  return (
    <svg
      width='20'
      height='37'
      viewBox='0 0 20 37'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M0.871887 1L18 18.1281L0.871887 35.2562'
        stroke='#99A9AF'
        strokeWidth='2.37465' // Changed from 'stroke-width' to 'strokeWidth'
      />
    </svg>
  );
});

IconChevronRight.displayName = 'IconChevronRight';

export default IconChevronRight;
