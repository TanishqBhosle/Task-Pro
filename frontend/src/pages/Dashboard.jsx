"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import ProjectCard from "../components/ProjectCard"
import CreateProjectForm from "../components/CreateProjectForm"
import { getProjects } from "../services/projectService"

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
      setError("")
    } catch (error) {
      setError("Failed to fetch projects")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev])
    setShowCreateForm(false)
  }

  return (
    <div>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <div className="container">
            <div className="flex justify-between items-center mb-4">
              <h1>Dashboard</h1>
              <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn btn-primary">
                {showCreateForm ? "Cancel" : "Create Project"}
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {showCreateForm && <CreateProjectForm onProjectCreated={handleProjectCreated} />}

            {loading ? (
              <div>Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="card">
                <div className="card-body text-center">
                  <p>No projects found. Create your first project!</p>
                </div>
              </div>
            ) : (
              <div className="grid">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
