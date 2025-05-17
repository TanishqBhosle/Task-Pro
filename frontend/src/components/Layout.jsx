import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // If still loading, show a loading indicator
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
