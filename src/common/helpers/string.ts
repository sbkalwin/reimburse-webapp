import { format } from 'date-fns';
import numeral from 'numeral';

export function string2money(rawValue: string | number): string {
  const value = typeof rawValue === 'number' ? rawValue : parseFloat(rawValue);
  if (isNaN(value)) return '';
  return numeral(value).format(`0,0`);
}

export function formatDateTime(date: Date) {
  return format(date, 'dd MMM yyyy, HH:mm');
}

export function formatDate(date: Date) {
  return format(date.toISOString().substring(0, 10), 'dd MMM yyyy');
}

export const isWindowUndefined = typeof window === 'undefined';
