import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { useAppSelector } from '../providers/hooks';

const ProfilePage = () => {
  const users = useAppSelector((store) => store.chat.users);
  const user = useAppSelector((state) => state.auth.user);
  
  console.log(user);

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#E3F2FD' }}>
      <Box
        sx={{
          width: 500,
          backgroundColor: 'white',
          padding: 2,
          borderRight: '1px solid #ddd',
          //   overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: 500,
            backgroundColor: 'white',
            padding: 2,
            borderRight: '1px solid #ddd',
            //   overflowY: 'auto',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              backgroundColor: 'gray',
              padding: 2,
              borderRight: '1px solid #ddd',
              //   overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Фото
            </Typography>
          </Box>
          <Box
            sx={{
              width: 300,
              height: 200,
              backgroundColor: 'white',
              padding: 2,
              borderRight: '1px solid #ddd',
              //   overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Обо мне:
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 450,
            height: 50,
            backgroundColor: 'gray',
            padding: 2,
            borderRight: '1px solid #ddd',
            //   overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Кнопки добавления групп
          </Typography>
        </Box>
        <Box
          sx={{
            width: 450,
            height: 500,
            backgroundColor: 'lightblue',
            padding: 2,
            borderRight: '1px solid #ddd',
            //   overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Группы
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <Paper
          sx={{
            flex: 1,
            margin: 2,
            padding: 2,
            // overflowY: 'auto',
            display: 'flex',
            flexDirection: 'co',
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <Box
              //   key={message.id}
              sx={{ marginBottom: 1 }}
            >
              <Typography variant="body2" fontWeight="bold">
                AUTHOR:
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: 2 }}>
                TEXT
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;
