import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const bookAPI = {
  getAll: (params = {}) => api.get('/books/', { params }),
  getById: (id) => api.get(`/books/${id}/`),
};

export const authorAPI = {
  getAll: () => api.get('/authors/'),
  getById: (id) => api.get(`/authors/${id}/`),
};

export const publisherAPI = {
  getAll: () => api.get('/publishers/'),
  getById: (id) => api.get(`/publishers/${id}/`),
};

export const authAPI = {
  login: (credentials) => api.post('/login/', credentials),
  register: (userData) => api.post('/register/', userData),
  logout: () => api.post('/logout/'),
  getProfile: () => api.get('/profile/'),
  updateProfile: (data) => api.put('/profile/', data),
};

export default api;