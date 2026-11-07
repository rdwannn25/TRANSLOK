import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppLayout from './components/layout/AppLayout.jsx';

import NotFound from './pages/NotFound.jsx';
import Loader from './pages/Loader.jsx';
import Head from './components/common/Head.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />, 
    action: async ({ request, params }) => {
      // You can handle form submissions or other actions here if needed
      return null;
    },
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Head title={'TRANSLOK | Sistem Informasi Transportasi Lokal'} image={'./assets/images/Poster2.png'} />
            <Home />
          </Suspense>
        ),
      },
    ],
  },
]);