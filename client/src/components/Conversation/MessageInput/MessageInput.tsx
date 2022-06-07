import { TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import { user } from '../../../dummyMessages';
import { Socket } from 'socket.io-client';

const MessageInput = ({ socket }: { socket: Socket }) => {
  const [newMessageContent, setNewMessageContent] = useState('');

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    handleSend();
  };

  const handleSend = () => {
    if (!newMessageContent) {
      return;
    }

    const newMessage: Message = {
      content: newMessageContent,
      from: user._id,
      to: 'Everyone',
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
