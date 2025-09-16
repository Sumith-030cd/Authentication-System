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

// Response interceptor - with debugging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    
    // Only redirect to login on 401 for auth-related endpoints
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - cookies may not be sent properly');
      
      // Only redirect if it's a profile or auth endpoint
      if (error.config?.url?.includes('/api/profile') || error.config?.url?.includes('/api/auth')) {
        console.log('Redirecting to login due to authentication failure');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
