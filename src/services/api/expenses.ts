import { Expense } from '../../types';
import { api, getAuthHeader } from './common';

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await api.get('/expenses/', { headers: getAuthHeader() });
  return response.data;
};

export const addExpense = async (expenseData: Omit<Expense, 'id' | 'category_name' | 'groups'> & { group_ids: number[] }): Promise<Expense> => {
  const response = await api.post('/expenses/', expenseData, { headers: getAuthHeader() });
  return response.data;
};

export const updateExpense = async (id: number, expenseData: Omit<Expense, 'id' | 'category_name' | 'groups'> & { group_ids: number[] }): Promise<Expense> => {
  const response = await api.put(`/expenses/${id}/`, expenseData, { headers: getAuthHeader() });
  return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await api.delete(`/expenses/${id}/`, { headers: getAuthHeader() });
};