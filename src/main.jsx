import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './page/Home';
import About from './page/About';
import Contact from './page/Contact';
import App from './App';
import ErrorPage from './page/ErrorPage';
import CanvasDetail from './page/CanvasDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'canvases/:id',
        element: <CanvasDetail />,

      }
    ],
    errorElement: <ErrorPage />,
  },

]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initalIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)

