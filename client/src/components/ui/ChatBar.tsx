import { Box, Button, List, ListItem, ListItemText, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../providers/hooks';
import { addGroup } from '../providers/chatws/chatSlice';

export default function ChatBar():JSX.Element {
    const [open, setOpen] = useState(false);
    const [groupTitle, setGroupTitle] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const groups = useAppSelector((store) => store.chat.groups);
    const user = useAppSelector((state) => state.auth.user);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
          <Button variant="h6" gutterBottom onClick={handleOpen}>
            чат
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
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
            <Button 
              variant="contained" 
              onClick={handleSubmit} 
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
              <ListItemText primary={group.title} onClick={() => navigate(`/group/${group.id}`)}/>
            </ListItem>
          ))}
        </List>
      </Box>
  )
}
