import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

const Profile = ({ socket }: Props) => {
  return <div>Profile</div>;
};

export default Profile;
