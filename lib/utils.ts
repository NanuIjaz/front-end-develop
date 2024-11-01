import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormat(
  num: number,
  currency: string = 'JPY',
  showCurrencySymbol: boolean = true,
) {
  const formattedNumber = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  }).format(num);

  if (!showCurrencySymbol) {
    // Remove the currency symbol
    return formattedNumber.replace(/[^\d.,-]/g, '').trim();
  }

  return formattedNumber.replace('JPY', '').trim();
}
