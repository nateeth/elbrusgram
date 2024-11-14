import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material';
import ChatPage from './components/pages/ChatPage';
import PaintPage from './components/canvas/pages/PaintPage';

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
          path: '/chat',
          element: <ChatPage />,
        },
        {
          path: '/paint',
          element: <PaintPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />{' '}
    </ThemeProvider>
  );
}

export default App;
