import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
};
const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });
    
    const user = await User.create({ name, email, passwordHash: password });
    res.status(201).json({
      success: true,
      data: {
        _id: user._id, name: user.name, email: user.email, role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      // Check account lockout
      if (user.lockUntil && user.lockUntil > new Date()) {
        return res.status(403).json({ success: false, message: 'Account is temporarily locked. Try again later.' });
      }

      if (await user.comparePassword(password)) {
        // Reset login attempts
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        const token = generateToken(user.id, user.role);
        
        // Use httpOnly cookie for storing tokens securely
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000 // 15 mins
        });

        res.json({ success: true, token, user: { _id: user.id, name: user.name, email: user.email, role: user.role } });
      } else {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 10) {
          user.lockUntil = new Date(Date.now() + 60 * 60 * 1000); // lock for 1 hour
        }
        await user.save();
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out successfully' });
};

export const getMe = async (req: any, res: Response) => {
  if (req.user) {
    res.json({ success: true, data: req.user });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
};
