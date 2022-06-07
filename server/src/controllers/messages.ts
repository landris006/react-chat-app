import { Request, Response } from 'express';
import { Message } from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();

    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
