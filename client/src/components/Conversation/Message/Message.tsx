import { Avatar, Chip, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import './Message.scss';

const Message = ({
  _id,
  content,
  createdAt,
  senderId,
  senderUsername,
}: Message) => {
  const currentUser = useAppSelector(({ users }) => users.currentUser);

  const isOwnMessage = currentUser?._id === senderId;

  const dateToShow = moment(createdAt).calendar();

  return (
    <div className={`${isOwnMessage ? 'own-message' : ''}`}>
      <Typography variant="caption" align={isOwnMessage ? 'right' : 'left'}>
        {dateToShow}
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: `${isOwnMessage ? 'flex-end' : 'flex-start'}`,
        }}
      >
        {isOwnMessage || <Avatar>{senderUsername?.charAt(0)}</Avatar>}{' '}
        {/* TODO: user neve */}
        <Chip
          className="messageText"
          size="medium"
          label={content}
          color={isOwnMessage ? 'primary' : 'default'}
        />
      </div>
    </div>
  );
};

export default Message;
