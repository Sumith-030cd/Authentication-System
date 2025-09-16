import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - simplified for now
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // For now, just redirect to login on 401 without refresh attempts
    if (error.response?.status === 401) {
      console.log('Unauthorized access, redirecting to login');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
