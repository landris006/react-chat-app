import { TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../../hooks';
import { newMessage } from '../../../types/Message';

interface Props {
  socket: Socket;
}

const MessageInput = ({ socket }: Props) => {
  const currentUser = useAppSelector(({ users }) => users.currentUser)!;
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

    const newMessage: newMessage = {
      content: newMessageContent,
      senderId: currentUser._id,
      senderUsername: currentUser.username,
      receiverId: 'EVERYONE',
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
