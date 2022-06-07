import axios from 'axios';

const url = 'http://localhost:5000/messages';

export const getMessages = async () => {
  const messages: Array<Message> = await (
    await axios.get(`${url}/getMessages`)
  ).data.messages;
  return messages;
};
