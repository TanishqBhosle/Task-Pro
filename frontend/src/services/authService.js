import api from "./api"

export const loginUser = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password })
  return response.data
}

export const registerUser = async (name, email, password) => {
  const response = await api.post("/api/auth/register", { name, email, password })
  return response.data
}

export const getUserProfile = async () => {
  const response = await api.get("/api/auth/profile")
  return response.data
}
