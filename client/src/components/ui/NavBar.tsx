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
  const username = user?.name;

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
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="/Subject.png"
                alt="Logo"
                style={{ width: '50px', height: 'auto', marginTop: '8px' }}
              />
            </Link>
          </Typography>
          {/* ПОКА В ЦЕЛЯХ ТЕСТИРОВАНИЯ КНОПКА ДОСТУПНА ВСЕМ */}
          <Button color="primary" onClick={() => (window.location.href = '/chat')}>
            Чат
          </Button>
          {isAuthenticated ? (
            <div style={{ color: 'blue' }}>
              <div>Добро пожаловать, {username}</div>
              <Button color="primary" onClick={() => (window.location.href = '/main')}>
                На главную
              </Button>

              <Button color="primary" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          ) : (
            <div style={{ color: 'blue', fontWeight: '400' }}>
              <Button color="primary" onClick={() => (window.location.href = '/login')}>
                Войти
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
