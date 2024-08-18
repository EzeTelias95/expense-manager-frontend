import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Token ${token}` };
};