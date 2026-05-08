import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export const register = async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(result.success ? 201 : 400).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.status(result.success ? 200 : 401).json(result);
};

export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const result = await authService.getMe(userId);
  res.status(result.success ? 200 : 404).json(result);
};