import { ExpenseGroup } from '../../types';
import { api, getAuthHeader } from './common';

export const getExpenseGroups = async (): Promise<ExpenseGroup[]> => {
  const response = await api.get('/expense-groups/', { headers: getAuthHeader() });
  return response.data;
};

export const addExpenseGroup = async (name: string): Promise<ExpenseGroup> => {
  const response = await api.post('/expense-groups/', { name }, { headers: getAuthHeader() });
  return response.data;
};