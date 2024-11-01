'use client';

import * as React from 'react';
import localFont from 'next/font/local';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const aeonik = localFont({
  src: [
    { path: '../public/fonts/Aeonik-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Aeonik-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Aeonik-Bold.woff2', weight: '700' },
  ],
  variable: '--font-aeonik',
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <style jsx global>{`
        :root {
          --font-aeonik: ${aeonik.style.fontFamily};
        }
      `}</style>

      {children}
    </NextThemesProvider>
  );
}
