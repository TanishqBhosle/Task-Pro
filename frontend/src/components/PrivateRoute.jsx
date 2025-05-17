"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return isAuthenticated ? element : <Navigate to="/login" />
}

export default PrivateRoute
