import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use(
  async request => request,
  error => Promise.reject(error),
);

export default apiService;
