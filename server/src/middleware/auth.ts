import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../env';
import { User } from '../types/User';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(403).json({ error: { message: 'No token provided...' } });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json(err);
    }

    req.body.user = user as User;
    next();
  });
};
