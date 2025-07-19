import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust if your backend runs on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
