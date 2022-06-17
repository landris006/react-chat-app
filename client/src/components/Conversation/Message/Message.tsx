import { Avatar, Chip, Paper, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import './Message.scss';
import { Message as MessageType } from '../../../types/Message';

const Message = ({
  _id,
  content,
  createdAt,
  senderId,
  senderUsername,
}: MessageType) => {
  const currentUser = useAppSelector(({ users }) => users.currentUser);
  const [isShowingName, setIsShowingName] = useState(false);
  const isOwnMessage = currentUser?._id === senderId;
  const dateToShow = moment(createdAt).calendar();

  return (
    <div className={`${isOwnMessage ? 'own-message' : ''}`}>
      <Typography variant="caption" align={isOwnMessage ? 'right' : 'left'}>
        {dateToShow}
      </Typography>
      <div
        className="message"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: `${isOwnMessage ? 'flex-end' : 'flex-start'}`,
        }}
      >
        {isOwnMessage || (
          <Avatar
            onMouseOver={() => setIsShowingName(true)}
            onMouseLeave={() => setIsShowingName(false)}
          >
            {senderUsername?.charAt(0)}
          </Avatar>
        )}
        {isShowingName && (
          <Paper elevation={6} className="username">
            <Typography>{senderUsername}</Typography>
          </Paper>
        )}
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
