"use client"

import { useState } from "react"
import { updateTask } from "../services/taskService"

const TaskItem = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedTask, setUpdatedTask] = useState(task)

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    try {
      const updated = await updateTask(task._id, { status: newStatus })
      onUpdate(updated)
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setUpdatedTask(task)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updated = await updateTask(task._id, updatedTask)
      onUpdate(updated)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const getPriorityClass = () => {
    switch (task.priority) {
      case "high":
        return "badge-high"
      case "medium":
        return "badge-medium"
      case "low":
        return "badge-low"
      default:
        return "badge-medium"
    }
  }

  if (isEditing) {
    return (
      <div className="task-item">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={updatedTask.description}
              onChange={handleChange}
              className="form-input"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <select name="priority" value={updatedTask.priority} onChange={handleChange} className="form-input">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="task-item">
      <div className="task-title">{task.title}</div>
      <p className="mb-2">{task.description}</p>
      <div className="task-meta">
        <span className={`badge ${getPriorityClass()}`}>{task.priority}</span>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button onClick={handleEdit} className="btn btn-secondary mt-2">
        Edit
      </button>
    </div>
  )
}

export default TaskItem
