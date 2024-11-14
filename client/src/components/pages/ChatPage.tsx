import React, { useState } from 'react';
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

const users = [
  { id: 1, name: 'User1' },
  { id: 2, name: 'User2' },
  { id: 3, name: 'User3' },
  { id: 4, name: 'User4' },
];

const messages = [
  { id: 1, userId: 1, text: 'Привет всем!' },
  { id: 2, userId: 2, text: 'Привет, как дела?' },
  { id: 3, userId: 3, text: 'Здравствуй, как ты?' },
  { id: 4, userId: 4, text: 'Привет, чем все занимаются?' },
];

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      messages.push({
        id: messages.length + 1,
        userId: 1,
        text: newMessage,
      });
      setNewMessage('');
    }
  };

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
            <ListItem key={user.id} button>
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
                  {users.find((user) => user.id === message.userId)?.name}:
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                  {message.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        <Box sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            fullWidth
            variant="outlined"
            label="Напишите сообщение..."
            sx={{ marginRight: 2 }}
          />
          <Button
            onClick={handleSendMessage}
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
