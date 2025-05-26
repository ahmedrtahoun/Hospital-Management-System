import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Add request interceptor for common headers
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, 'with method:', config.method);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, 'from:', response.config.url);
    return response;
  },
  async (error) => {
    if (!error.response) {
      const message = 'Network error. Please check your connection and try again.';
      toast.error(message);
      console.error('Connection failed:', error.message);
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      toast.error('Please log in to continue');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (data) => api.post('/user/login', data),
  register: (data) => api.post('/user/patient/register', data),
  logout: () => api.get('/user/logout'),
  getProfile: () => api.get('/user/me'),
  getAllPatients: () => api.get('/user/admin/patients'),
  getDoctors: () => api.get('/user/doctors')
};

export const appointmentAPI = {
  create: (data) => api.post('/appointment/create', data),
  getAll: () => api.get('/appointment/getall'),
  update: (id, status) => api.put(`/appointment/update/${id}`, { status }),
  delete: (id) => api.delete(`/appointment/delete/${id}`),
};

export const messageAPI = {
  send: (data) => api.post('/message/send', data),
  getAll: () => api.get('/message/getall')
};

export default api; 