import { TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../../hooks';

const MessageInput = ({ socket }: { socket: Socket }) => {
  const currentUser = useAppSelector(({ users }) => users.currentUser)!;
  const [newMessageContent, setNewMessageContent] = useState('');

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    handleSend();
  };

  const handleSend = () => {
    console.log(currentUser);

    if (!newMessageContent) {
      return;
    }

    const newMessage: Message = {
      content: newMessageContent,
      from: currentUser._id,
      to: 'EVERYONE',
    };

    socket.emit('sendMessage', newMessage);

    setNewMessageContent('');
  };

  return (
    <TextField
      label="Say something..."
      value={newMessageContent}
      onChange={(e) => setNewMessageContent(e.target.value)}
      onKeyDown={handleKeydown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSend} color="primary">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MessageInput;
