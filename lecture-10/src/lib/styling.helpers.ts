import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const checkIfElementClamped = (element: Element) => {
  return element.scrollHeight > element.clientHeight;
};
