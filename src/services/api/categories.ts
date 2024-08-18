import { Category } from '../../types';
import { api, getAuthHeader } from './common';

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories/', { headers: getAuthHeader() });
  return response.data;
};

export const addCategory = async (name: string): Promise<Category> => {
  const response = await api.post('/categories/', { name }, { headers: getAuthHeader() });
  return response.data;
};