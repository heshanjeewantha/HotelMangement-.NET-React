import axios from 'axios';

const API_URL = 'https://localhost:7013/api/rooms';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllRooms = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getAvailableRooms = async () => {
  const response = await api.get('/available');
  return response.data;
};

export const addRoom = async (room) => {
  const response = await api.post('/', room);
  return response.data;
};

export const updateRoom = async (id, room) => {
  const response = await api.put(`/${id}`, room);
  return response.data;
};

export const deleteRoom = async (id) => {
  await api.delete(`/${id}`);
};

export const bookRoom = async (booking) => {
  const response = await axios.post('https://localhost:7013/api/bookings', booking, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};