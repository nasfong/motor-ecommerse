import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMoney = (number: number) => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  // Use a dynamic approach to set fraction digits based on the value
  const numberString = number.toString();
  const hasDecimal = numberString.includes('.');

  if (hasDecimal) {
    // Set both minimum and maximum fraction digits to 2 when there's a decimal
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
  }

  return number.toLocaleString('en-US', options);
};
