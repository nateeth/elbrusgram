import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Modal,
  List,
  ListItem,
  ListItemText,

} from '@mui/material';
import { useParams } from 'react-router-dom'
import {  useAppSelector } from '../providers/hooks';
import ChatwsContext from '../providers/chatws/chatwsContext';

import ChatBar from '../ui/chatBar';


export default function OneGroupPage(): JSX.Element {
    const messages = useAppSelector((store) => store.chat.messages);
    const { sendData } = useContext(ChatwsContext);

    const {groupId} = useParams()
    const groupmessages = messages.filter((message) => message.groupid === Number(groupId));

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#E3F2FD' }}>
     <ChatBar/>

       
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#E3F2FD' }}>
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
        {groupmessages.map((message) => (
          <Box key={message.id} sx={{ marginBottom: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              {message.authorName}:
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
        sendData(text, groupId);
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
      <Button type="submit" variant="contained" color="primary" sx={{ height: '100%' }}>
        Отправить
      </Button>
    </Box>
  </Box>
  </Box>
  </Box>
  )
}
