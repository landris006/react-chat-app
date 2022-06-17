import { Card, Divider, IconButton, Modal, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack/Stack';
import { useState } from 'react';
import Room from './Room/Room';
import './Rooms.scss';

const Rooms = () => {
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Stack className="stack" gap={1}>
      <header className="rooms-header">
        <Typography variant="h2">Chats</Typography>
        <IconButton
          onClick={() => setIsModalOpen(true)}
          color="primary"
          className="add-icon"
        >
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </header>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card>
          <Typography variant="h4">Create new room</Typography>
          asd
        </Card>
      </Modal>

      <Divider />
      <Room />
      <Room />
    </Stack>
  );
};

export default Rooms;
