import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../providers/hooks';
import { useEffect, useState } from 'react';
import { loadWallPostsThunk } from '../providers/wall/postsThunk';
import { useParams } from 'react-router-dom';
import { addPost, deletePost } from '../providers/wall/postsSlice';
import axiosInstance from '../../services/axiosInstance';


const ProfilePage = () => {
  const [updatedUser, setUpdatedUser] = useState({});
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    void dispatch(loadWallPostsThunk(params.id));
  }, []);

  const posts = useAppSelector((store) => store.post.posts); 

const editImage = async (e) => {
  e.preventDefault();
  if (e.target.files.length === 0) return;
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('img', file); 
  try {
    const response = await axiosInstance.patch(`/users/${user.id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(updateAvatar(response));
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

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
            component="img"
            sx={{
              width: 200,
              height: 200,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              backgroundColor: 'gray',
              padding: 2,
              borderRight: '1px solid #ddd',
              //   overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            src={`http://localhost:3000/img/${user?.avatar}`}
            alt="avatar"
          ></Box>
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
            <Typography variant="h6" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {user?.nick}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 450,
            height: 50,
            // backgroundColor: 'gray',
            padding: 2,
            borderRight: '1px solid #ddd',
            //   overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <form>
            <Button variant="contained" color="primary" component="label">
              Заменить аватар
              <input type="file" id="file-edit" onChange={editImage} name="img" hidden />
            </Button>
          </form>
        </Box>
        <Box
          sx={{
            width: 450,
            height: 500,
            backgroundColor: 'white',
            padding: 2,
            borderRight: '1px solid #ddd',
            //   overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom></Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <Paper
          sx={{
            flex: 1,
            margin: 2,
            padding: 2,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
          }}
        >
          <Box className="wallposts" sx={{ marginBottom: 2 }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const text = formData.get('text');
                dispatch(
                  addPost({
                    authorid: user.id,
                    userid: params.id,
                    wallreaction: text,
                    Userwallauthor: user,
                  }),
                );
                return e.currentTarget.reset();
              }}
              //   key={message.id}
              sx={{
                marginBottom: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                name="text"
                fullWidth
                variant="outlined"
                label="Оставить сообщение на стене...."
                sx={{ marginRight: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ height: '100%' }}>
                Отправить
              </Button>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
              {posts?.map((post) => (
                <Typography key={post.id}>
                  <Typography variant="body2" fontWeight="bold">
                    Автор: {post.Userwallauthor.name}
                  </Typography>
                  <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    {post.wallreaction}
                  </Typography>
                  <Button onClick={() => dispatch(deletePost(post.id))}>Удалить</Button>
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;
