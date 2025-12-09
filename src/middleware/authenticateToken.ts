import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token found (requires Authorization header)' });
  }

  const [type, token] = authHeader.split(' ');

 
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Wrong token-format' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is expired' });
  }
};