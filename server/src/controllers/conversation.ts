import { Request, Response } from 'express';
import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { TypedRequestBody } from '../types/common';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ roomId: req.query.roomId });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;

    const rooms = await Room.find({ members: { $elemMatch: { _id: userId } } });

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const createRoom = async (
  req: TypedRequestBody<{ name: string; members: User[]; ownerId: string }>,
  res: Response
) => {
  try {
    const { name, members, ownerId } = req.body;

    if (!name) {
      res.status(403).json({ error: { message: 'Name is required...' } });
      return;
    }

    if (name === 'everyone') {
      res
        .status(403)
        .json({ error: { message: "Name 'everyone' is reserved..." } });
      return;
    }

    const nameAlreadyExists = await Room.findOne({ name });
    if (nameAlreadyExists) {
      res.status(403).json({
        error: { message: `Name '${name}' is taken...` },
      });
      return;
    }

    const newRoom = await Room.create({ name, members, ownerId });

    res.status(200).json(newRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
