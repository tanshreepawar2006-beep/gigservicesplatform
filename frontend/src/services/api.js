import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('serveeasy_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred.';
    return Promise.reject(new Error(message));
  }
);

// Auth & License Services
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getMe: () => api.get('/auth/me'),
  checkLicense: (providerId) => api.get(`/auth/verify-license/${providerId}`),
  updateLicense: (licenseData) => api.put('/auth/provider/license', licenseData),
};

// Services Catalog
export const servicesAPI = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  create: (serviceData) => api.post('/services', serviceData),
  update: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  delete: (id) => api.delete(`/services/${id}`),
  getMyListings: () => api.get('/services/my/listings'),
};

// Bookings & Jobs & Photos
export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getCustomerBookings: () => api.get('/bookings/my'),
  getProviderBookings: () => api.get('/bookings/provider'),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  getProviderStats: () => api.get('/bookings/provider/stats'),
  uploadPhotos: (bookingId, photoData) => api.post(`/bookings/${bookingId}/photos`, photoData),
  deletePhoto: (bookingId, photoId, stage) =>
    api.delete(`/bookings/${bookingId}/photos/${photoId}`, { params: { stage } }),
};

export default api;
