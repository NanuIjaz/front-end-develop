import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center max-sm:justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2.5',
  {
    variants: {
      variant: {
        default:
          'bg-white dark:bg-navy-700 text-navy-700 dark:text-white hover:bg-navy-700/90 hover:bg-white dark:hover:bg-navy-700',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'dark:text-white text-navy-700 text-base font-medium !p-0',
        white:
          'dark:bg-white bg-navy-700 text-white dark:text-navy-700 dark:disabled:bg-white/10 hover:bg-navy-500',
      },
      size: {
        default: 'h-[50px]  xl:h-10 px-5 py-3 rounded-[36px]',
        sm: 'h-9 rounded-md px-3',
        md: 'h-[50px] rounded-[34px] px-5',
        xl: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  noArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      loading,
      noArrow,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const renderChildComponent = () => {
      if (loading) {
        return <Loader2 className='animate-spin' />;
      }
      if (!noArrow) {
        return <Arrow />;
      }
      return null;
    };

    return (
      <div className='group'>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
          {renderChildComponent()}
        </Comp>
      </div>
    );
  },
);
Button.displayName = 'Button';

const Arrow = () => {
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
Arrow.displayName = 'Arrow';

export { Button, buttonVariants };
