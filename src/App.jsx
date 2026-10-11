import './App.css'
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Shows from './pages/Shows';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Shows />
      }
    ]
  },
  {
    path: "*",
    element: <div>404 not found</div>
  }
]);

function Router() {

  return (
    <>
      <RouterProvider router={router} />,
    </>
  )
}

export default Router
