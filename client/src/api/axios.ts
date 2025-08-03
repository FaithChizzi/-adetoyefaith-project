
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Updated base path (optional, adjust as needed)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;