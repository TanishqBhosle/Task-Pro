"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, registerUser, getUserProfile } from "../services/authService"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await getUserProfile()
          setUser(userData)
        } catch (error) {
          console.error("Failed to get user profile:", error)
          // Clear error state when logging out due to invalid token
          setError(null)
          logout()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [token])

  const login = async (email, password) => {
    try {
      setError(null)
      const data = await loginUser(email, password)
      setUser(data)
      setToken(data.token)
      localStorage.setItem("token", data.token)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      setError(null)
      const data = await registerUser(name, email, password)
      setUser(data)
      setToken(data.token)
      localStorage.setItem("token", data.token)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed")
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
