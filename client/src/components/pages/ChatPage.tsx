import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { useAppSelector } from '../../store/hook';
import ChatwsContext from '../../store/chatws/chatwsContext';

const ChatPage = () => {
  const users = useAppSelector((store) => store.chat.users);
  const messages = useAppSelector((store) => store.chat.messages);
  const { sendData } = useContext(ChatwsContext);




  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#E3F2FD' }}>
      <Box
        sx={{
          width: 250,
          backgroundColor: 'white',
          padding: 2,
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Пользователи
        </Typography>
        <List sx={{ padding: 0 }}>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          <Box sx={{ marginBottom: 2 }}>
            {messages.map((message) => (
              <Box key={message.id} sx={{ marginBottom: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  {users.find((user) => user.id === message.authorid)?.name}:
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                  {message.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const text = formData.get('text');
            if (!text || typeof text !== 'string') return console.log('Error');
            sendData(text);
            return e.currentTarget.reset();
          }}
          sx={{ padding: 2, display: 'flex', alignItems: 'center' }}
        >
          <TextField
            name="text"
            fullWidth
            variant="outlined"
            label="Напишите сообщение..."
            sx={{ marginRight: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ height: '100%' }}
          >
            Отправить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
