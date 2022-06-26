import { Paper, Typography } from '@mui/material';
import { Message } from '../../../types/Message';
import { User } from '../../../types/User';
import './Room.scss';

interface Props {
  _id: string;
  name?: string;
  members?: User[];
  lastMessage?: Message;
  selectedRoomId: string;
  setSelectedRoomId: (id: string) => void;
}

const Room = ({
  _id,
  name,
  members,
  lastMessage,
  selectedRoomId,
  setSelectedRoomId,
}: Props) => {
  const isSelected = _id === selectedRoomId;

  return (
    <Paper
      className={`room ${isSelected && 'selected'}`}
      elevation={0}
      component="button"
      onClick={() => setSelectedRoomId(_id)}
    >
      <Typography className="room-title" variant="h6">
        {name}
      </Typography>
    </Paper>
  );
};

export default Room;
