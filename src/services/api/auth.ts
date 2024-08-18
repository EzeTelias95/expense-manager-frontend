import { api, getAuthHeader } from './common';

export const login = async (username: string, password: string) => {
  const response = await api.post('/token/', { username, password });
  return response.data.token;
};

export const logout = () => {
  localStorage.removeItem('token');
};