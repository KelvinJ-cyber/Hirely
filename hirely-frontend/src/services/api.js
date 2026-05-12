import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authService = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
};

export const userService = {
  createProfile: (userId, data) => api.post(`/api/users/create/${userId}`, data),
  addEducation: (userId, data) => api.post(`/api/users/education/${userId}`, data),
  addExperience: (userId, data) => api.post(`/api/users/experience/${userId}`, data),
  uploadResume: (userId, formData) => api.post(`/api/users/resume/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api;
