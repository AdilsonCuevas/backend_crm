import { Request, Response } from 'express';
import * as companyService from '../services/companyService.js';

export const getAllCompanies = async (req: Request, res: Response) => {
  const result = await companyService.getAllCompanies();
  res.json(result);
};

export const getCompanyById = async (req: Request, res: Response) => {
  const result = await companyService.getCompanyById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};

export const createCompany = async (req: Request, res: Response) => {
  const result = await companyService.createCompany(req.body);
  res.status(result.success ? 201 : 400).json(result);
};

export const updateCompany = async (req: Request, res: Response) => {
  const result = await companyService.updateCompany(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const result = await companyService.deleteCompany(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};