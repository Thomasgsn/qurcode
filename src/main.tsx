import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import DisplayQR from './DisplayQR.tsx'

import './assets/style/index.css'

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
    <main className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-2">
      <RouterProvider router={router} />
    </main>
  </StrictMode>,
)
