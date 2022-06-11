import axios from 'axios';

const url = 'http://localhost:5000/messages';

export const getMessages = async () => {
  const response = await axios.get<Message[]>(`${url}/get-messages`);

  return response.data;
};
