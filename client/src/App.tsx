import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Pages
import Layout from './Layout';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
