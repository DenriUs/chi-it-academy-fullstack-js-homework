'use client';

import { NextErrorBoundaryProps } from '@/navigation/types';
import { ErrorCard } from '@/components/ErrorCard';

type HomeErroPageProps = NextErrorBoundaryProps;

export default function HomeErrorPage({ reset }: HomeErroPageProps) {
  return <ErrorCard title='Uknown error occured' onRetry={reset} />;
}
