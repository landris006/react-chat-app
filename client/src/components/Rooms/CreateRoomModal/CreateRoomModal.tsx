import {
  Modal,
  Card,
  Typography,
  TextField,
  Autocomplete,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { createRoom } from '../../../api/conversation';
import { getAllUsers } from '../../../api/users';
import { useAppSelector, useErrorMessage } from '../../../hooks';
import { Room } from '../../../types/Room';
import { User } from '../../../types/User';
import './CreateRoomModal.scss';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  addRoom: (newRoom: Room) => void;
}

const CreateRoomModal = ({ isModalOpen, closeModal, addRoom }: Props) => {
  const currentUser = useAppSelector(({ users }) => users.currentUser)!;
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [avaliableUsers, setAvaliableUsers] = useState<User[]>([]);
  const [roomName, setRoomName] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { sendError } = useErrorMessage();

  const updateUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
  };

  const handleSelect = (selectedUser: User | null) => {
    if (!selectedUser) {
      return;
    }

    setSelectedUsers([...selectedUsers, selectedUser]);
  };

  const handleSubmit = async () => {
    try {
      const room = await createRoom({
        name: roomName,
        members: [...selectedUsers, currentUser],
        ownerId: currentUser._id,
      });

      addRoom(room);

      enqueueSnackbar('Room created!', { variant: 'success' });

      closeModal();
    } catch (error) {
      sendError(error);
    }
  };

  useEffect(() => {
    const selectedUserIds = selectedUsers.map((user) => user._id);

    setAvaliableUsers(
      allUsers.filter((user) => !selectedUserIds.includes(user._id))
    );
  }, [allUsers, selectedUsers]);

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Card className="modal">
        <Typography variant="h4">Create new room</Typography>

        <TextField
          required
          fullWidth
          margin="normal"
          label="Name of the room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          name="roomName"
        />

        <Typography className="selected-users-label">Members: </Typography>

        <div className="selected-users-list">
          {selectedUsers.map((selectedUser) => (
            <Chip
              key={selectedUser._id}
              className="messageText"
              size="medium"
              label={selectedUser.username}
              onDelete={() =>
                setSelectedUsers(
                  selectedUsers.filter((user) => user._id !== selectedUser._id)
                )
              }
            />
          ))}
        </div>

        <Autocomplete
          autoComplete={false}
          openOnFocus
          clearOnBlur
          selectOnFocus
          clearOnEscape
          disableCloseOnSelect
          onOpen={updateUsers}
          options={avaliableUsers.sort((a, b) =>
            a.username.localeCompare(b.username)
          )}
          getOptionLabel={(user) => user.username}
          onChange={(e, selectedUser) => handleSelect(selectedUser)}
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

        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </Card>
    </Modal>
  );
};

export default CreateRoomModal;
