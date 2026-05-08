import prisma from '../config/database.js';
import { ApiResponse } from '../types/index.js';

export const getAllDeals = async (): Promise<ApiResponse> => {
  const deals = await prisma.deal.findMany({
    orderBy: { createdAt: 'desc' },
    include: { contact: true, company: true },
  });
  return { success: true, data: deals };
};

export const getDealById = async (id: string): Promise<ApiResponse> => {
  const deal = await prisma.deal.findUnique({
    where: { id },
    include: { contact: true, company: true, tasks: true },
  });
  if (!deal) {
    return { success: false, error: 'Deal not found' };
  }
  return { success: true, data: deal };
};

export const createDeal = async (data: any): Promise<ApiResponse> => {
  const { expectedCloseDate, ...rest } = data;
  const deal = await prisma.deal.create({
    data: {
      ...rest,
      expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
    },
  });
  return { success: true, data: deal };
};

export const updateDeal = async (id: string, data: any): Promise<ApiResponse> => {
  try {
    const { expectedCloseDate, ...rest } = data;
    const deal = await prisma.deal.update({
      where: { id },
      data: {
        ...rest,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : undefined,
      },
    });
    return { success: true, data: deal };
  } catch {
    return { success: false, error: 'Deal not found' };
  }
};

export const deleteDeal = async (id: string): Promise<ApiResponse> => {
  try {
    await prisma.deal.delete({ where: { id } });
    return { success: true, data: { message: 'Deal deleted' } };
  } catch {
    return { success: false, error: 'Deal not found' };
  }
};