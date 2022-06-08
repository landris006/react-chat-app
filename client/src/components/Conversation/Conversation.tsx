import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Message from './Message/Message';
import './Conversation.scss';
import { newMessage } from '../../reducers/messages';
import { io } from 'socket.io-client';
import { getMessages } from '../../api/messages';
import MessageInput from './MessageInput/MessageInput';

const socket = io('http://localhost:5000');

const Conversation = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(({ messages }) => messages);

  const [initialLoad, setInitialLoad] = useState(true);

  const dummyDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    getMessages((messages) => dispatch(newMessage(messages)));

    setInitialLoad(false);
  }, [dispatch, initialLoad]);

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
