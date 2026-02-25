import { createBrowserRouter } from 'react-router';

import { APP_ROUTES } from '@/router/constants';

import { MainLayout } from '@layouts/MainLayout';
import { AuthLayout } from '@layouts/AuthLayout';

import { stripePageLoader, StripePageContainer, StripePageError } from '@pages/StripePage';
import {
  userProfilePageLoader,
  UserProfilePageContainer,
  UserProfilePageError,
} from '@pages/UserProfilePage';
import { postPageLoader, PostPageContainer, PostPageError } from '@pages/PostPage';
import { NewPostPage } from '@pages/NewPostPage';
import { LoginPage } from '@pages/LoginPage';
import { RegisterPage } from '@pages/RegisterPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { ProtectedRoute } from '@components/router/ProtectedRoute';
import { PublicRoute } from '@components/router/PublicRoute';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: APP_ROUTES.home,
        loader: stripePageLoader,
        errorElement: <StripePageError />,
        element: <StripePageContainer />,
      },
      {
        path: APP_ROUTES.myPosts,
        loader: userProfilePageLoader,
        errorElement: <UserProfilePageError />,
        element: (
          <ProtectedRoute>
            <UserProfilePageContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: APP_ROUTES.post,
        loader: postPageLoader,
        errorElement: <PostPageError />,
        element: (
          <ProtectedRoute>
            <PostPageContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: APP_ROUTES.newPost,
        element: (
          <ProtectedRoute>
            <NewPostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: APP_ROUTES.any,
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: APP_ROUTES.login,
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: APP_ROUTES.register,
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
    ],
  },
]);
