// 'use client';

// Next
import type { Metadata, Viewport } from 'next';

// Style
import '@/styles/global.scss';

// Next
import dynamic from 'next/dynamic';

// Components
import { ThemeProvider } from '@/components/theme-provider';

// Dynamic Components
const RootHeader = dynamic(() => import('@/components/root/header'));
const RootFooter = dynamic(() => import('@/components/root/footer'));

export const metadata: Metadata = {
  title: 'EMURGO Academy | Home',
  description: 'EMURGO Academy',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
};

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='min-w-screen scroll-smooth'>
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <RootHeader />
          <div className='max-sm:mt-44 max-xl:mt-16'>{children}</div>
          <RootFooter />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default MainLayout;
