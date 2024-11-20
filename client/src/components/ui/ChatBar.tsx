import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Modal,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
  } from '@mui/material';
  import React, { useContext, useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAppDispatch, useAppSelector } from '../providers/hooks';

import { getAllUsers } from '../providers/users/userThunk';
import ChatwsContext, { groupDataType } from '../providers/chatws/chatwsContext';
  


  export default function ChatBar(): JSX.Element {
    const [open, setOpen] = useState(false);
    const [groupTitle, setGroupTitle] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const groups = useAppSelector((store) => store.chat.groups);
    const users = useAppSelector((store) => store.users.users); 
    const user = useAppSelector((state) => state.auth.user);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const { sendGroupData } = useContext(ChatwsContext); 
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      void dispatch(getAllUsers());
    }, [dispatch]);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setGroupTitle('');
      setGroupDescription('');
      setSelectedUsers([]); 
    }
  
  
    const handleUserChange = (userId: string) => {
        console.log('Toggling user:', userId);
        setSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };
  
    const handleSubmitGroup = (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log('Submitting group data:', { groupTitle, groupDescription, selectedUsers });
        const newGroupData: groupDataType = {
          title: groupTitle,
          description: groupDescription,
          chatflag: false,
          ownerid: user.id,
          users: selectedUsers,
        };
    
        sendGroupData(newGroupData);
    
        handleClose();
    };
  
    return (
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'space-around' }}>
          <Typography variant="h6" gutterBottom>
            Пользователи
          </Typography>
          <Button onClick={handleOpen}>
            чат
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Создание группы
              </Typography>
              <TextField
                label="Название группы"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Описание группы"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
  
              
              <Typography variant="subtitle1">Выберите пользователей:</Typography>
              {users.map((user ) => (
                <FormControlLabel
                  key={user.id}
                  control={
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserChange(user.id)}
                    />
                  }
                  label={user.name}
                />
              ))}
  
              <Button 
                variant="contained" 
                onClick={handleSubmitGroup} 
                sx={{ marginTop: 2 }}
              >
                Создать группу
              </Button>
            </Box>
          </Modal>
        </Box>
        <List sx={{ padding: 0 }}>
          {groups.map((group) => (
            <ListItem key={group.id}>
              <ListItemText primary={group.title} onClick={() => navigate(`/group/${group.id}`)} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
