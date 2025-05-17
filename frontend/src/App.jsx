"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuth } from "./store/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import ProjectView from "./pages/ProjectView"
import Tasks from "./pages/Tasks"
import Automations from "./pages/Automations"
import NotFound from "./pages/NotFound"

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Layout><Dashboard /></Layout>} />} />
        <Route path="/projects" element={<PrivateRoute element={<Layout><Projects /></Layout>} />} />
        <Route path="/projects/:id" element={<PrivateRoute element={<Layout><ProjectView /></Layout>} />} />
        <Route path="/tasks" element={<PrivateRoute element={<Layout><Tasks /></Layout>} />} />
        <Route path="/automations" element={<PrivateRoute element={<Layout><Automations /></Layout>} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
