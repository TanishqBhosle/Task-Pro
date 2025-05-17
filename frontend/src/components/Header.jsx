"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        TaskHub
      </Link>
      <nav className="navbar-nav">
        {user ? (
          <>
            <div className="nav-item">
              <span>Welcome, {user.name}</span>
            </div>
            <div className="nav-item">
              <button onClick={logout} className="btn btn-primary">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
