"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuth } from "./store/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
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
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/projects" element={<PrivateRoute element={<Projects />} />} />
        <Route path="/projects/:id" element={<PrivateRoute element={<ProjectView />} />} />
        <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} />
        <Route path="/automations" element={<PrivateRoute element={<Automations />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
