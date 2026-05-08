import prisma from '../config/database.js';
import { ApiResponse } from '../types/index.js';

export const getAllContacts = async (): Promise<ApiResponse> => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return { success: true, data: contacts };
};

export const getContactById = async (id: string): Promise<ApiResponse> => {
  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) {
    return { success: false, error: 'Contact not found' };
  }
  return { success: true, data: contact };
};

export const createContact = async (data: any): Promise<ApiResponse> => {
  const contact = await prisma.contact.create({ data });
  return { success: true, data: contact };
};

export const updateContact = async (id: string, data: any): Promise<ApiResponse> => {
  try {
    const contact = await prisma.contact.update({ where: { id }, data });
    return { success: true, data: contact };
  } catch {
    return { success: false, error: 'Contact not found' };
  }
};

export const deleteContact = async (id: string): Promise<ApiResponse> => {
  try {
    await prisma.contact.delete({ where: { id } });
    return { success: true, data: { message: 'Contact deleted' } };
  } catch {
    return { success: false, error: 'Contact not found' };
  }
};