import { Request, Response } from 'express';
import * as taskService from '../services/taskService.js';

export const getAllTasks = async (req: Request, res: Response) => {
  const result = await taskService.getAllTasks();
  res.json(result);
};

export const getTaskById = async (req: Request, res: Response) => {
  const result = await taskService.getTaskById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};

export const createTask = async (req: Request, res: Response) => {
  const result = await taskService.createTask(req.body);
  res.status(result.success ? 201 : 400).json(result);
};

export const updateTask = async (req: Request, res: Response) => {
  const result = await taskService.updateTask(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
};

export const deleteTask = async (req: Request, res: Response) => {
  const result = await taskService.deleteTask(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};