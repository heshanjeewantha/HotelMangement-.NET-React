import axios from 'axios';

const API_URL = 'https://localhost:7013/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const logout = async () => {
  await api.post('/logout');
};

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};