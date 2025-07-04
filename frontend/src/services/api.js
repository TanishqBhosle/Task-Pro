import axios from "axios"

// Hardcoding the API URL since we can't modify .env file
const API_URL = "http://localhost:5000"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      // Use a more reliable way to navigate in React
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

export default api
