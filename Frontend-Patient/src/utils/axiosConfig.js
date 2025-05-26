import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add a request interceptor for logging and error handling
instance.interceptors.request.use(
    (config) => {
        console.log(`Making request to: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor for error handling
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            console.error('Network error:', error.message);
            throw new Error('Network error. Please check your connection and try again.');
        }

        if (error.response.status === 401) {
            console.log('Unauthorized, redirecting to login');
            // You can dispatch an action here to update auth state if needed
            window.location.href = '/login';
        }

        throw error;
    }
);

export default instance; 