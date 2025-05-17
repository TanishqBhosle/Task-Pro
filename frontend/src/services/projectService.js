import api from "./api"

export const getProjects = async () => {
  const response = await api.get("/api/projects")
  return response.data
}

export const getProject = async (id) => {
  const response = await api.get(`/api/projects/${id}`)
  return response.data
}

export const createProject = async (projectData) => {
  const response = await api.post("/api/projects", projectData)
  return response.data
}

export const updateProject = async (id, projectData) => {
  const response = await api.put(`/api/projects/${id}`, projectData)
  return response.data
}

export const deleteProject = async (id) => {
  const response = await api.delete(`/api/projects/${id}`)
  return response.data
}

export const addProjectMember = async (projectId, userId) => {
  const response = await api.post(`/api/projects/${projectId}/members`, { userId })
  return response.data
}
