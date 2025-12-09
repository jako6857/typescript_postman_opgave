import { Response, NextFunction } from 'express'
import { AuthRequest } from './authenticateToken.js'

export const authorizeRole = (...allowedRoles: string[]) => {
return (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ message: 'You are not logged in' })
  }

  if (allowedRoles.length === 0) {
    return next()
  }

  if (!allowedRoles.includes(user.role)) {
    return res.status(403).json({ message: 'You dont have permissions to access the url' })
  }

    return next();
  }
}