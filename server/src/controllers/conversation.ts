import { Request, Response } from 'express';
import { Message } from '../models/Message';
import { Room } from '../models/Room';
import { User } from '../models/User';
import { TypedRequestBody } from '../types/common';
import { User as UserType } from '../types/User';

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

    const rooms = await Room.find({ members: userId });

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const createRoom = async (
  req: TypedRequestBody<{ name: string; members: string[]; ownerId: string }>,
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

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.query.roomId;
    const user = req.body.user;
    const roomToDelete = await Room.findById(roomId);

    if (!roomToDelete) {
      res.status(403).json({ error: { message: 'Room not found...' } });
      return;
    }

    if (user._id !== roomToDelete?.ownerId) {
      res.status(403).json({
        error: { message: 'You are not the owner of this room...' },
      });
      return;
    }

    const deletedRoom = await Room.findByIdAndDelete(roomId);

    res.status(200).json(deletedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const cleanedUsers: UserType[] = users.map((user) => {
      const plainObjectUser = user.toObject();
      delete plainObjectUser.password;
      return plainObjectUser;
    });

    res.status(200).json(cleanedUsers);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};
