import prisma from '../config/database.js';
import { ApiResponse } from '../types/index.js';

export const getAllCompanies = async (): Promise<ApiResponse> => {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return { success: true, data: companies };
};

export const getCompanyById = async (id: string): Promise<ApiResponse> => {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) {
    return { success: false, error: 'Company not found' };
  }
  return { success: true, data: company };
};

export const createCompany = async (data: any): Promise<ApiResponse> => {
  const company = await prisma.company.create({ data });
  return { success: true, data: company };
};

export const updateCompany = async (id: string, data: any): Promise<ApiResponse> => {
  try {
    const company = await prisma.company.update({ where: { id }, data });
    return { success: true, data: company };
  } catch {
    return { success: false, error: 'Company not found' };
  }
};

export const deleteCompany = async (id: string): Promise<ApiResponse> => {
  try {
    await prisma.company.delete({ where: { id } });
    return { success: true, data: { message: 'Company deleted' } };
  } catch {
    return { success: false, error: 'Company not found' };
  }
};