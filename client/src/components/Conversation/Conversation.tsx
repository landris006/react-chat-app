import React, { useEffect, useRef } from 'react';
import { Container } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Message from './Message/Message';
import './Conversation.scss';
import { newMessage, fetchMessages } from '../../reducers/conversation';
import { Socket } from 'socket.io-client';
import { getMessages } from '../../api/conversation';
import MessageInput from './MessageInput/MessageInput';

const Conversation = ({ socket }: { socket: Socket }) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(({ conversation }) => conversation.messages);

  const dummyDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages().then((messages) => dispatch(fetchMessages(messages)));
  }, [dispatch]);

  console.log('asd');

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(newMessage(message));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch, socket]);

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
