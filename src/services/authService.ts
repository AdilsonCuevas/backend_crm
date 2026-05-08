import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { registerSchema, loginSchema } from '../middlewares/validation.js';
import { ApiResponse } from '../types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRY = '7d';

export const register = async (data: any): Promise<ApiResponse> => {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: 'Email already registered' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

  return { success: true, data: { user, token } };
};

export const login = async (data: any): Promise<ApiResponse> => {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, error: 'Invalid credentials' };
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return { success: false, error: 'Invalid credentials' };
  }

  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

  return {
    success: true,
    data: {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    },
  };
};

export const getMe = async (userId: string): Promise<ApiResponse> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  if (!user) {
    return { success: false, error: 'User not found' };
  }

  return { success: true, data: user };
};