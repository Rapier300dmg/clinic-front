import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'https://clinic-system-amwk.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
