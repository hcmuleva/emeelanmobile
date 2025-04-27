
// api.js
import axios from 'axios';

const API_URL = 'add api url here'; // currently looking for method that dont required

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login function
export const login = async (identifier, password) => {
  try {
    const response = await api.post('/custom-login', {
      identifier, // Email or username
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data?.error?.message || 'Login failed';
  }
};

