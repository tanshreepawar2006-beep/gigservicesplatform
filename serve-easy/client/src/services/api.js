const API_BASE = '/api';

const getHeaders = (tokenRequired = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (tokenRequired) {
    const token = localStorage.getItem('serveeasy_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

export const api = {
  // Auth endpoints
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  signup: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(res);
  },

  // Service endpoints
  getServices: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.providerId) query.append('providerId', params.providerId);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE}/services${queryString}`, {
      method: 'GET',
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  getServiceById: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'GET',
      headers: getHeaders(false),
    });
    return handleResponse(res);
  },

  createService: async (serviceData) => {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData),
    });
    return handleResponse(res);
  },

  updateService: async (id, serviceData) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData),
    });
    return handleResponse(res);
  },

  deleteService: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse(res);
  },

  // Booking endpoints
  createBooking: async (bookingData) => {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(bookingData),
    });
    return handleResponse(res);
  },

  getMyBookings: async () => {
    const res = await fetch(`${API_BASE}/bookings/my-bookings`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(res);
  },

  updateBookingStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },
};
