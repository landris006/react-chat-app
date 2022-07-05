import { Divider, IconButton, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack/Stack';
import { useEffect, useState } from 'react';
import Room from './Room/Room';
import './Rooms.scss';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';
import { getRooms } from '../../api/conversation';
import { useAppDispatch, useAppSelector, useErrorMessage } from '../../hooks';
import { setRooms } from '../../reducers/conversation';

const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useAppSelector(({ users }) => users.currentUser)!;
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(({ conversation }) => conversation.rooms);

  const { sendError } = useErrorMessage();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getRooms(currentUser._id)
      .then((rooms) => dispatch(setRooms(rooms)))
      .catch((err) => sendError(err, 'Could not fetch rooms...'));
  }, [currentUser._id]);

  return (
    <Stack className="stack" gap={1}>
      <header className="rooms-header">
        <Typography variant="h2">Chats</Typography>

        <IconButton
          onClick={() => {
            setIsModalOpen(true);
          }}
          color="primary"
          className="add-icon"
        >
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </header>

      <CreateRoomModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <Divider />
      <ul className="roomList">
        <li>
          <Room name={'everyone'} _id={'everyone'} ownerId="" members={[]} />
        </li>

        {rooms.map((room) => (
          <li key={room._id}>
            <Room {...room} />
          </li>
        ))}
      </ul>
    </Stack>
  );
};

export default Rooms;
