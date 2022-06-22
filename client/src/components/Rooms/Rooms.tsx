import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack/Stack';
import { useState } from 'react';
import Room from './Room/Room';
import './Rooms.scss';
import { getAllUsers } from '../../api/users';
import { User } from '../../types/User';

const Rooms = () => {
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const updateUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
    console.log(users);
  };

  return (
    <Stack className="stack" gap={1}>
      <header className="rooms-header">
        <Typography variant="h2">Chats</Typography>
        <IconButton
          onClick={() => {
            setIsModalOpen(true);
            updateUsers();
          }}
          color="primary"
          className="add-icon"
        >
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </header>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card className="modal">
          <Typography variant="h4">Create new room</Typography>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Name of the room"
            name="username"
          />
          <Autocomplete
            id="combo-box-demo"
            autoComplete={false}
            options={users}
            getOptionLabel={(user) => user.username}
            renderOption={(props, user) => (
              <li {...props}>
                <Avatar className="option-avatar">
                  {user.username.charAt(0)}
                </Avatar>
                {user.username}
              </li>
            )}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} margin="normal" label="Add user" />
            )}
          />
          <Typography className="selected-users-label" marginY={2}>
            Selected users:
          </Typography>
          <Button variant="contained">Create</Button>
        </Card>
      </Modal>

      <Divider />
      <Room />
      <Room />
    </Stack>
  );
};

export default Rooms;
