import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppLayout from './components/layout/AppLayout.jsx';

import NotFound from './pages/NotFound.jsx';
import Loader from './pages/Loader.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />, 
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
]);