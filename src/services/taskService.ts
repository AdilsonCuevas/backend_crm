import prisma from '../config/database.js';
import { ApiResponse } from '../types/index.js';

export const getAllTasks = async (): Promise<ApiResponse> => {
  const tasks = await prisma.task.findMany({
    orderBy: { dueDate: 'asc' },
    include: { deal: true },
  });
  return { success: true, data: tasks };
};

export const getTaskById = async (id: string): Promise<ApiResponse> => {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    return { success: false, error: 'Task not found' };
  }
  return { success: true, data: task };
};

export const createTask = async (data: any): Promise<ApiResponse> => {
  const { dueDate, ...rest } = data;
  const task = await prisma.task.create({
    data: {
      ...rest,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });
  return { success: true, data: task };
};

export const updateTask = async (id: string, data: any): Promise<ApiResponse> => {
  try {
    const { dueDate, ...rest } = data;
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...rest,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });
    return { success: true, data: task };
  } catch {
    return { success: false, error: 'Task not found' };
  }
};

export const deleteTask = async (id: string): Promise<ApiResponse> => {
  try {
    await prisma.task.delete({ where: { id } });
    return { success: true, data: { message: 'Task deleted' } };
  } catch {
    return { success: false, error: 'Task not found' };
  }
};