// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
