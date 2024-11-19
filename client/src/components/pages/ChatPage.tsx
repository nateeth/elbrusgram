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
  Modal,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../providers/hooks';
import ChatwsContext from '../providers/chatws/chatwsContext';
import { addGroup } from '../providers/chatws/chatSlice';
import { useNavigate } from 'react-router-dom';
import OneGroupPage from './OneGroupPage';

const ChatPage = () => {
  const [open, setOpen] = useState(false);
  const [groupTitle, setGroupTitle] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const users = useAppSelector((store) => store.chat.users);
  const messages = useAppSelector((store) => store.chat.messages);
  const { sendData } = useContext(ChatwsContext);
  const groups = useAppSelector((store) => store.chat.groups);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newGroupData = {
      title: groupTitle,
      description: groupDescription,
      chatflag: false,
      ownerid: user.id,
      users: [],
    };
    dispatch(addGroup(newGroupData));
    
    setGroupTitle('');
    setGroupDescription('');
    
    handleClose();
  };
  console.log(messages);

  return (
   
      <Box>

      <OneGroupPage />
    </Box>
  );
};

export default ChatPage;
