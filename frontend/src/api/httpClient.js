import axios from 'axios';

// Base URL from env or default to Vite proxy/backend route
// @ts-ignore
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL,
  headers: {
    // Do NOT set Content-Type globally; let each request decide (important for FormData)
    Accept: 'application/json',
  },
  // Set to true if you need to send/receive cookies with CORS
  withCredentials: false,
  timeout: 20000,
});

// Normalize axios errors to a consistent Error with status and data
function normalizeAxiosError(error) {
  if (error.response) {
    const data = error.response.data;
    const message =
      (typeof data === 'string' && data) ||
      data?.error ||
      data?.message ||
      error.message ||
      'Request failed';
    return { message, status: error.response.status, data };
  }
  if (error.request) {
    return { message: 'No response from server', status: 0, data: null };
  }
  return { message: error.message || 'Request setup failed', status: 0, data: null };
}

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const norm = normalizeAxiosError(error);
    const err = Object.assign(new Error(norm.message), {
      status: norm.status,
      data: norm.data
    });
    return Promise.reject(err);
  }
);

// Helper methods that unwrap .data and keep a small surface area
const http = {
  get: (url, config) => api.get(url, config).then((r) => r.data),
  post: (url, data, config = {}) =>
    api
      .post(url, data, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(config.headers || {}),
        },
      })
      .then((r) => r.data),
  put: (url, data, config = {}) =>
    api
      .put(url, data, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(config.headers || {}),
        },
      })
      .then((r) => r.data),
  patch: (url, data, config = {}) =>
    api
      .patch(url, data, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(config.headers || {}),
        },
      })
      .then((r) => r.data),
  delete: (url, config) => api.delete(url, config).then((r) => r.data),
  // For file uploads (FormData). Do not set Content-Type; browser will set correct boundary.
  postForm: (url, formData, config = {}) =>
    api
      .post(url, formData, {
        ...config,
        headers: {
          ...(config.headers || {}),
          // No 'Content-Type' here; letting browser set multipart boundary
        },
      })
      .then((r) => r.data),
  putForm: (url, formData, config = {}) =>
    api
      .put(url, formData, {
        ...config,
        headers: {
          ...(config.headers || {}),
          // No 'Content-Type' here; letting browser set multipart boundary
        },
      })
      .then((r) => r.data),
};

export { api };
export default http;
