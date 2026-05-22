import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/style/index.css'

const App = lazy(() => import('./App.tsx'));
const DisplayQR = lazy(() => import('./DisplayQR.tsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/qr",
    element: <DisplayQR />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen min-w-screen bg-[linear-gradient(135deg,#ff9ffc_0%,#5227ff_52%,#b19eef_100%)]" />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
