import http from '../utils/http';

export const authService = {
  login: (identifier, password) => 
    http.post('/auth/local', { identifier, password }),

  register: (username, email, password) =>
    http.post('/auth/local/register', { username, email, password }),

  resetPassword: (userId, newPassword) =>
    http.post('/reset-password', { userId, newPassword }),

  getMe: () => 
    http.get('/users/me', { params: { populate: '*' } })
};