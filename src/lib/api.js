import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://locatepro-back.onrender.com'

export const api = axios.create({ baseURL: API_BASE })

// Attach token to every request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('lp_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
  }
  return config
})

// Set token and save/remove from storage
export function setAuth(t) {
  if (t) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + t
    localStorage.setItem('lp_token', t)
  } else {
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('lp_token')
  }
}

// Load token from storage on app start
export function loadAuth() {
  const t = localStorage.getItem('lp_token')
  if (t) setAuth(t)
}

// ...existing code...

/**
 * Loads site settings from the backend API.
 * Returns a promise that resolves to the settings object.
 */
export async function loadSettings() {
  try {
    const { data } = await api.get('/settings');
    return data;
  } catch (error) {
    // Fallback to default settings if API fails
    return {
      siteName: 'LocatePro',
      logo: '',
      // Add other default settings as needed
    };
  }
}
