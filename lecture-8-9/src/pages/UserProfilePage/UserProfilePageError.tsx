import { useRouteError } from 'react-router';

import { ApiError } from '@api/api.error';

import { ErrorCard } from '@components/ErrorCard';
import { HttpStatusCode } from 'axios';
import { useAppNavigate } from '@hooks/useAppNavigate';
import { NotFoundErrorCard } from '@components/NotFoundErrorCard';

export function UserProfilePageError() {
  const error = useRouteError();

  const navigate = useAppNavigate();

  if (error instanceof ApiError && error.statusCode === HttpStatusCode.NotFound) {
    return <NotFoundErrorCard title='Page Not Found' onRetry={() => navigate('/')} />;
  }

  return (
    <ErrorCard
      title='Uknown error occured'
      onRetry={() => navigate('.', { options: { replace: true } })}
    />
  );
}
