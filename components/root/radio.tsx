/* eslint-disable  @typescript-eslint/no-explicit-any */

// React
import { forwardRef } from 'react';

// Next
import dynamic from 'next/dynamic';

// Dynamic Components
const Input = dynamic(() =>
  import('@/components/ui/input').then((components) => components.Input),
);

export type TBaseRadio = {
  label?: string;
};

const Radio = forwardRef<HTMLInputElement, any>(
  ({ label = '', ...rest }, ref) => {
    return (
      <div className='flex gap-3 items-center'>
        <Input
          type='radio'
          ref={ref}
          {...rest}
          className='peer/radio checked:bg-navy-700 w-5 h-5 bg-navy-200'
          onChange={() => rest.onChange(rest.value)}
        />
        <p
          className='font-poppins font-medium peer-checked/radio:font-bold text-tw-grey-600 peer-checked/radio:text-tw-dark-grey cursor-pointer'
          onClick={() => rest.onChange(rest.value)}
        >
          {label}
        </p>
      </div>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;
