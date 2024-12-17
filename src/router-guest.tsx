import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import LoginRegister from './layouts/LoginRegister';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

// Dashboards

// Applications

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);
const routesGuest: RouteObject[] = [
  {
    path: '/',
    element: <LoginRegister />,
    children: [
      {
        path: '',
        element: <Navigate to="/login-register" replace />
      }
    ]
  },
  {
    path: '/login-register',
    element: <LoginRegister />
  }
];

export default routesGuest;
