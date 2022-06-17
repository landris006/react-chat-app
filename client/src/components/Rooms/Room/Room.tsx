import { Paper, Typography } from '@mui/material';
import './Room.scss';

const Room = () => {
  return (
    <Paper className="room" elevation={0}>
      <Typography className="room-title" variant="button">
        Everyone
      </Typography>
    </Paper>
  );
};

export default Room;
