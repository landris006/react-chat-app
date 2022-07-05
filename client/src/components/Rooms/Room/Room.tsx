import { IconButton, Paper, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Room.scss';
import {
  useAppDispatch,
  useAppSelector,
  useErrorMessage,
} from '../../../hooks';
import { Room as RoomType } from '../../../types/Room';
import { deleteRoom } from '../../../api/conversation';
import { removeRoom } from '../../../reducers/conversation';
import { useSnackbar } from 'notistack';

const Room = ({ _id, name, members, ownerId }: RoomType) => {
  const dispatch = useAppDispatch();
  const currentRoomId = useParams().roomId;
  const currentUser = useAppSelector(({ users }) => users.currentUser)!;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { sendError } = useErrorMessage();

  const isOwner = currentUser._id === ownerId;
  const isSelected = _id === currentRoomId;

  /* TODO: remove room functionality */
  const handleRemove = async (roomId: string) => {
    try {
      const removedRoom = await deleteRoom(roomId);
      console.log(removedRoom);

      dispatch(removeRoom(removedRoom._id));
      navigate('/everyone');
      enqueueSnackbar('Room deleted!', { variant: 'success' });
    } catch (error) {
      sendError(error, "Couldn't delete room...");
    }
  };

  return (
    <Link to={`/${_id}`}>
      <Paper className={`room ${isSelected && 'selected'}`} elevation={0}>
        <Typography className="room-title" variant="h6">
          {name}
        </Typography>
        {isOwner && (
          <IconButton
            className="room-delete-button"
            color="error"
            onClick={() => handleRemove(_id)}
          >
            <CancelIcon />
          </IconButton>
        )}
      </Paper>
    </Link>
  );
};

export default Room;
