import { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../providers/hooks';
import ChatwsContext from '../providers/chatws/chatwsContext';
import ChatBar from '../ui/ChatBar';

export default function OneGroupPage(): JSX.Element {
  const messages = useAppSelector((store) => store.chat.messages);
  const { sendData, editMessage } = useContext(ChatwsContext);
  // const { user } = useContext(UserContext); 

  const { groupId } = useParams();
  const groupmessages = messages.filter((message) => message.groupid === Number(groupId));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLElement>, messageId: number, text: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentMessageId(messageId);
    setEditingText(text);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentMessageId(null);
  };

  const handleDelete = () => {
    console.log(`Deleting message with id: ${currentMessageId}`);
    handleClose();
  };

  const handleEdit = () => {
    setIsEditing(currentMessageId);
    handleClose();
  };

  const handleForward = () => {
    console.log(`Forwarding message with id: ${currentMessageId}`);
    handleClose();
  };

  const handleSave = () => {
    if (isEditing !== null && editingText.trim()) {
      editMessage(isEditing, editingText, Number(groupId));
      setIsEditing(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#E3F2FD' }}>
      <ChatBar />

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
                <Box
                  key={message.id}
                  sx={{ marginBottom: 1, display: 'flex', justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Typography variant="body2" fontWeight="bold" sx={{ marginRight: 1 }}>
                      {message.authorName}:
                    </Typography>
                    {isEditing === message.id ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <TextField
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{ marginRight: 1 }}
                        />
                        <IconButton color="primary" onClick={handleSave}>
                          <CheckIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Typography variant="body1" sx={{ marginLeft: 2 }}>
                        {message.text}
                      </Typography>
                    )}
                  </Box>

                  <Button
                    onClick={(event) => handleClick(event, message.id, message.text)}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    ...
                  </Button>
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
            sx={{
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              position: 'sticky',
              bottom: 0,
              backgroundColor: '#fff',
            }}
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

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDelete} sx={{ color: 'red', fontSize: '0.875rem' }}>
          Удалить
        </MenuItem>
        {/* {user.id === message.authorId && ( */}
          <MenuItem onClick={handleEdit} sx={{ fontSize: '0.875rem' }}>
            Редактировать
          </MenuItem>
        {/* )} */}
        <MenuItem onClick={handleForward} sx={{ fontSize: '0.875rem' }}>
          Переслать
        </MenuItem>
      </Menu>
    </Box>
  );
}
