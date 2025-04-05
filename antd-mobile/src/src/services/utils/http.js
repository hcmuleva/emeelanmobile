import axios from 'axios';
import qs from 'qs';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:1337/api',
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
});

// Request interceptor
http.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
http.interceptors.response.use(
  response => response.data, // Directly return the data
  error => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Request failed';
    console.error('API Error:', errorMessage);
    return Promise.reject(errorMessage);
  }
);

export default http;