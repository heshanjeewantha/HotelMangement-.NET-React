import axios from 'axios';

const API_URL = 'https://localhost:7013/api/bookings';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllBookings = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get('/mybookings');
  return response.data;
};