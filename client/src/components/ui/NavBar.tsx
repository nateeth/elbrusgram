import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppBar, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { logoutUser } from '../../store/authSlice';
import { Link } from 'react-router-dom';

export default function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.status === 'succeeded');
  const user = useAppSelector((state) => state.auth.user);
  let username = user?.name;
    
    const handleLogout = async (): Promise<void> => {
      try {
        await dispatch(logoutUser()).unwrap();
        alert('Logged out successfully');
        window.location.reload();
      } catch (error) {
        alert('Failed to log out');
      }
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
              🍥
            </Link>
          </Typography>
          {isAuthenticated ? (
            <div>
              <div>Добро пожаловать, {username}</div>
              <Button color="inherit" onClick={() => (window.location.href = '/main')}>
                На главную
              </Button>
            </div>
          ) : (
            <Button color="inherit" onClick={() => (window.location.href = '/login')}>
              Войти
            </Button>
          )}

          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
