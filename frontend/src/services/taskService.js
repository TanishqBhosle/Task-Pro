import api from "./api"

export const getTasks = async (projectId = null) => {
  try {
    const url = projectId ? `/api/tasks/project/${projectId}` : '/api/tasks'
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

export const getTask = async (id) => {
  const response = await api.get(`/api/tasks/${id}`)
  return response.data
}

export const createTask = async (taskData) => {
  const response = await api.post("/api/tasks", taskData)
  return response.data
}

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/api/tasks/${id}`, taskData)
  return response.data
}

export const deleteTask = async (id) => {
  const response = await api.delete(`/api/tasks/${id}`)
  return response.data
}
