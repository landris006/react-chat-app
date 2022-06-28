import { Divider, IconButton, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack/Stack';
import { useEffect, useState } from 'react';
import Room from './Room/Room';
import './Rooms.scss';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';
import { Room as RoomType } from '../../types/Room';
import { deleteRoom, getRooms } from '../../api/conversation';
import { useAppSelector, useErrorMessage } from '../../hooks';

const Rooms = () => {
  const currentUser = useAppSelector(({ users }) => users.currentUser)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const { sendError } = useErrorMessage();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const addRoom = (newRoom: RoomType) => {
    setRooms((rooms) => [...rooms, newRoom]);
  };
  /* TODO: remove room functionality */
  const removeRoom = async (roomId: string) => {
    await deleteRoom(roomId);
  };

  useEffect(() => {
    getRooms(currentUser._id)
      .then((rooms) => setRooms(rooms))
      .catch((err) => sendError(err, 'Could not fetch rooms'));
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

      <CreateRoomModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        addRoom={addRoom}
      />

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
