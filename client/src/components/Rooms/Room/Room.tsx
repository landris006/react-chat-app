import { IconButton, Paper, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link, useParams } from 'react-router-dom';
import { Message } from '../../../types/Message';
import { User } from '../../../types/User';
import './Room.scss';
import { useAppSelector } from '../../../hooks';
import { Room as RoomType } from '../../../types/Room';
import { deleteRoom } from '../../../api/conversation';

const Room = ({ _id, name, members, ownerId, lastMessage }: RoomType) => {
  const currentRoomId = useParams().roomId;
  const currentUser = useAppSelector(({ users }) => users.currentUser)!;

  const isOwner = currentUser._id === ownerId;
  const isSelected = _id === currentRoomId;

  return (
    <Link to={`/${_id}`}>
      <Paper className={`room ${isSelected && 'selected'}`} elevation={0}>
        <Typography className="room-title" variant="h6">
          {name}
        </Typography>
        {isOwner && (
          <IconButton color="error" onClick={() => deleteRoom(_id)}>
            <CancelIcon />
          </IconButton>
        )}
      </Paper>
    </Link>
  );
};

export default Room;
