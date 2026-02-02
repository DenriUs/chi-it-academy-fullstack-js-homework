import { Routes, Route, Navigate } from 'react-router';

import MainLayout from '@layouts/MainLayout';

import HomePage from '@pages/HomePage';
import HeroesPage from '@pages/HeroesPage';
import AboutPage from '@pages/AboutPage';
import NotFoundPage from '@pages/NotFoundPage';

import { AppRoutePathnames } from '@config/constants';

import HeroSidebar from '@components/HeroSidebar';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path={AppRoutePathnames.HOME} element={<HomePage />} />
      <Route path={AppRoutePathnames.HEROES} element={<HeroesPage />}>
        <Route path=':heroId' element={<HeroSidebar />} />
      </Route>
      <Route path={AppRoutePathnames.ABOUT} element={<AboutPage />} />
      <Route path={AppRoutePathnames.DEFAULT} element={<Navigate to={AppRoutePathnames.HOME} />} />
    </Route>
    <Route path={AppRoutePathnames.ANY} element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
