import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material';
import ChatPage from './components/pages/ChatPage';
import PaintPage from './components/pages/PaintPage';
import ProfilePage from './components/pages/ProfilePage';
import SignupPage from './components/pages/SignupPage';
import { useAppSelector } from './components/providers/hooks';
import { UserStatusEnum } from './schemas/authSchema';

const theme = createTheme({
  typography: {
    fontFamily: 'HelveticaNeue-Light, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Lucida Grande", Arial, sans-serif',
          textTransform: 'none',
        },
      },
    },
  },
});

function App(): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <div>404</div>,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
          ],
        },
        {
          path: '/chat',
          element: user.status === UserStatusEnum.logged ? <ChatPage /> : <LoginPage />,
        },
        {
          path: '/paint/:id',
          element: user.status === UserStatusEnum.logged ? <PaintPage /> : <LoginPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
