"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import TaskItem from "../components/TaskItem"
import CreateTaskForm from "../components/CreateTaskForm"
import { getProject, deleteProject } from "../services/projectService"
import { getTasks } from "../services/taskService"

const ProjectView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    fetchProjectAndTasks()
  }, [id])

  const fetchProjectAndTasks = async () => {
    try {
      setLoading(true)
      const projectData = await getProject(id)
      setProject(projectData)

      const tasksData = await getTasks(id)
      setTasks(tasksData)

      setError("")
    } catch (error) {
      setError("Failed to fetch project data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev])
    setShowCreateForm(false)
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) => prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)))
  }

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id)
        navigate("/")
      } catch (error) {
        setError("Failed to delete project")
        console.error(error)
      }
    }
  }

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status)
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="layout">
          <Sidebar />
          <div className="main-content">
            <div className="container">
              <div>Loading project...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="layout">
          <Sidebar />
          <div className="main-content">
            <div className="container">
              <div className="alert alert-danger">{error}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div>
        <Header />
        <div className="layout">
          <Sidebar />
          <div className="main-content">
            <div className="container">
              <div>Project not found</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <div className="container">
            <div className="flex justify-between items-center mb-4">
              <h1>{project.name}</h1>
              <div className="flex gap-2">
                <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn btn-primary">
                  {showCreateForm ? "Cancel" : "Add Task"}
                </button>
                <button onClick={handleDeleteProject} className="btn btn-danger">
                  Delete Project
                </button>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Description</h3>
                <p>{project.description}</p>
                <div className="mt-2">
                  <strong>Status:</strong> {project.status}
                </div>
              </div>
            </div>

            {showCreateForm && <CreateTaskForm projectId={id} onTaskCreated={handleTaskCreated} />}

            <h2 className="mb-2">Tasks</h2>
            <div className="task-board">
              <div className="task-column">
                <div className="task-column-header">
                  <h3>To Do</h3>
                  <span className="badge">{getTasksByStatus("todo").length}</span>
                </div>
                {getTasksByStatus("todo").map((task) => (
                  <TaskItem key={task._id} task={task} onUpdate={handleTaskUpdated} />
                ))}
              </div>

              <div className="task-column">
                <div className="task-column-header">
                  <h3>In Progress</h3>
                  <span className="badge">{getTasksByStatus("in_progress").length}</span>
                </div>
                {getTasksByStatus("in_progress").map((task) => (
                  <TaskItem key={task._id} task={task} onUpdate={handleTaskUpdated} />
                ))}
              </div>

              <div className="task-column">
                <div className="task-column-header">
                  <h3>Review</h3>
                  <span className="badge">{getTasksByStatus("review").length}</span>
                </div>
                {getTasksByStatus("review").map((task) => (
                  <TaskItem key={task._id} task={task} onUpdate={handleTaskUpdated} />
                ))}
              </div>

              <div className="task-column">
                <div className="task-column-header">
                  <h3>Done</h3>
                  <span className="badge">{getTasksByStatus("done").length}</span>
                </div>
                {getTasksByStatus("done").map((task) => (
                  <TaskItem key={task._id} task={task} onUpdate={handleTaskUpdated} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectView
