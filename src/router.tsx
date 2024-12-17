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

const Profiles = Loader(
  lazy(() => import('src/content/applications/Profiles'))
);
const GrantPermission = Loader(
  lazy(() => import('src/content/applications/GrantPermission'))
);
const Roles = Loader(lazy(() => import('src/content/applications/Roles')));
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);
const routes: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/management" replace />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="roles" replace />
      },

      {
        path: 'profiles',
        element: <Profiles />
      },
      {
        path: 'roles',
        element: <Roles />
      },
      {
        path: 'grant-permission',
        element: <GrantPermission />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          }
        ]
      }
    ]
  }
];

export default routes;
