import { Request, Response } from 'express';
import * as dealService from '../services/dealService.js';

export const getAllDeals = async (req: Request, res: Response) => {
  const result = await dealService.getAllDeals();
  res.json(result);
};

export const getDealById = async (req: Request, res: Response) => {
  const result = await dealService.getDealById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};

export const createDeal = async (req: Request, res: Response) => {
  const result = await dealService.createDeal(req.body);
  res.status(result.success ? 201 : 400).json(result);
};

export const updateDeal = async (req: Request, res: Response) => {
  const result = await dealService.updateDeal(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
};

export const deleteDeal = async (req: Request, res: Response) => {
  const result = await dealService.deleteDeal(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};