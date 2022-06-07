import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@mui/system';
import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Message from './Message/Message';
import './Conversation.scss';
import { newMessage } from '../../reducers/messages';
import { user } from '../../dummyMessages';
import { io } from 'socket.io-client';
import { getMessages } from '../../api/messages';
import MessageInput from './MessageInput/MessageInput';

const socket = io('http://localhost:5000');

const Conversation = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(({ messages }) => messages);

  let initialLoad = true;
  const [newMessageContent, setNewMessageContent] = useState('');

  const dummyDiv = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    getMessages().then((messages) => {
      dispatch(newMessage(messages));
    });
    initialLoad = false;
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(newMessage([message]));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch]);

  useEffect(() => {
    dummyDiv.current?.scrollIntoView();
  }, [messages]);

  return (
    <Container maxWidth="lg" className="message-container">
      <Typography variant="h2">Messages</Typography>
      <Stack
        justifyContent="space-between"
        spacing={2}
        className="messages-body"
        paddingBottom={2}
      >
        <Stack alignItems="flex-start" spacing={1} className="messages">
          {messages.map((message) => {
            return <Message key={message._id} {...message} />;
          })}
          <div ref={dummyDiv}></div>
        </Stack>
        <MessageInput socket={socket} />
      </Stack>
    </Container>
  );
};

export default Conversation;
