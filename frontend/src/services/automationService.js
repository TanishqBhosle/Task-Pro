import api from "./api"

export const getAutomations = async (projectId = null) => {
  try {
    const url = projectId ? `/api/automations?project=${projectId}` : "/api/automations"
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching automations:', error)
    throw error
  }
}

export const getAutomation = async (id) => {
  const response = await api.get(`/api/automations/${id}`)
  return response.data
}

export const createAutomation = async (automationData) => {
  const response = await api.post("/api/automations", automationData)
  return response.data
}

export const updateAutomation = async (id, automationData) => {
  const response = await api.put(`/api/automations/${id}`, automationData)
  return response.data
}

export const deleteAutomation = async (id) => {
  const response = await api.delete(`/api/automations/${id}`)
  return response.data
}

export const toggleAutomationStatus = async (id, isActive) => {
  const response = await api.put(`/api/automations/${id}`, { isActive: !isActive })
  return response.data
}
