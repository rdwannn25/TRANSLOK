import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppLayout from './components/layout/AppLayout.jsx';

import NotFound from './pages/NotFound.jsx';
import PetaTransportasi from './pages/PetaTransportasi.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));

const PageLoader = () => <div>Loading page...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />, 
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <PetaTransportasi />
          </Suspense>
        ),
      },
    ],
  },
]);