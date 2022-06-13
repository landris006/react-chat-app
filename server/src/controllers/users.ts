import { Request, Response } from 'express';
import { User } from '../models/User';
import { compare, hash } from 'bcrypt';
import { TypedRequestBody } from '../types/common';

export const signUp = async (
  req: TypedRequestBody<{
    username: string;
    password: string;
    confirmPassword: string;
  }>,
  res: Response
) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    res.status(403).json({ error: { message: 'Missing attributes...' } });
    return;
  }

  if (password !== confirmPassword) {
    res.status(403).json({ error: { message: 'Passwords do not match...' } });
    return;
  }

  const alreadyExists = (await User.findOne({ username })) !== null;

  if (alreadyExists) {
    res.status(403).json({ error: { message: 'Username already exists...' } });
    return;
  }

  try {
    const hashedPassword = await hash(password, 12);

    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};

export const login = async (
  req: TypedRequestBody<{
    username: string;
    password: string;
  }>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(403).json({ error: { message: 'Missing attributes...' } });
    return;
  }

  const user = await User.findOne({ username });

  if (!user) {
    res
      .status(403)
      .json({ error: { message: "Couldn't find user with that username..." } });
    return;
  }

  try {
    const match = await compare(password, user.password);

    if (!match) {
      res.status(403).json({ error: { message: 'Wrong password...' } });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};
