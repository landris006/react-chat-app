import axios from 'axios';

const url = 'http://localhost:5000/messages';

export const getMessages = async (cb?: (messages: Message[]) => any) => {
  try {
    const response = await axios.get(`${url}/getMessages`);

    const messages: Message[] = response.data.messages;

    if (typeof cb !== 'function') {
      return messages;
    }

    cb(messages);
  } catch (error) {
    console.log(error);
  }
};
