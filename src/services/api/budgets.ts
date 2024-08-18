import { Budget } from '../../types';
import { api, getAuthHeader } from './common';

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await api.get('/budgets/', { headers: getAuthHeader() });
  return response.data;
};

export const addBudget = async (budgetData: Omit<Budget, 'id'>): Promise<Budget> => {
  const response = await api.post('/budgets/', budgetData, { headers: getAuthHeader() });
  return response.data;
};