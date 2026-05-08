import { Request, Response } from 'express';
import * as contactService from '../services/contactService.js';

export const getAllContacts = async (req: Request, res: Response) => {
  const result = await contactService.getAllContacts();
  res.json(result);
};

export const getContactById = async (req: Request, res: Response) => {
  const result = await contactService.getContactById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};

export const createContact = async (req: Request, res: Response) => {
  const result = await contactService.createContact(req.body);
  res.status(result.success ? 201 : 400).json(result);
};

export const updateContact = async (req: Request, res: Response) => {
  const result = await contactService.updateContact(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
};

export const deleteContact = async (req: Request, res: Response) => {
  const result = await contactService.deleteContact(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};