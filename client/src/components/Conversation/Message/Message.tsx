import { Avatar, Chip, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import './Message.scss';

const Message = ({ _id, content, createdAt, from, to }: Message) => {
  const isCurrentUser = Number(_id?.substring(5, 7)) % 2 === 0;

  const dateToShow = moment(createdAt).calendar();

  return (
    <div className={`${isCurrentUser ? 'own-message' : ''}`}>
      <Typography variant="caption" align={isCurrentUser ? 'right' : 'left'}>
        {dateToShow}
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: `${isCurrentUser ? 'flex-end' : 'flex-start'}`,
        }}
      >
        {isCurrentUser || <Avatar sizes="">{from.charAt(0)}</Avatar>}{' '}
        {/* TODO: user neve */}
        <Chip
          className="messageText"
          size="medium"
          label={content}
          color={isCurrentUser ? 'primary' : 'default'}
        />
      </div>
    </div>
  );
};

export default Message;
