
import MainLayout from '../layouts/MainLayout';
import { Login, Home, SearchPage, Registration, ErrorPage, ManagePersonalLibrary, SpecificBook } from '../views/index';

export const routes = [
    {
      path: "/",
      element: <MainLayout />, 
      children: [ // Rutas que comparten el layout MainLayout
        {
          path: "/",
          element: <Home />,
          private: true,
        },
        {
          path: "/search",
          element: <SearchPage />,
          private: true,
        },
        {
          path: "/managePersonalLibrary",
          element: <ManagePersonalLibrary />,
          private: true,
        },
        {
          path: "/specificBook",
          element: <SpecificBook/>,
          private: true,
        },
        
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "*",
      element: <ErrorPage/>,
    },
]
