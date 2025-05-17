const asyncHandler = require("express-async-handler")
const Project = require("../models/Project")

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (!name || !description) {
    res.status(400)
    throw new Error("Please provide a name and description")
  }

  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
    members: [req.user._id],
  })

  res.status(201).json(project)
})

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }],
  }).sort({ createdAt: -1 })

  res.json(projects)
})

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error("Project not found")
  }

  // Check if user is owner or member
  if (project.owner.toString() !== req.user._id.toString() && !project.members.includes(req.user._id)) {
    res.status(403)
    throw new Error("Not authorized to access this project")
  }

  res.json(project)
})

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error("Project not found")
  }

  // Check if user is the owner
  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to update this project")
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.json(updatedProject)
})

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error("Project not found")
  }

  // Check if user is the owner
  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to delete this project")
  }

  await project.deleteOne()

  res.json({ message: "Project removed" })
})

// @desc    Add a member to a project
// @route   POST /api/projects/:id/members
// @access  Private
const addProjectMember = asyncHandler(async (req, res) => {
  const { userId } = req.body
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error("Project not found")
  }

  // Check if user is the owner
  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to add members to this project")
  }

  // Check if member already exists
  if (project.members.includes(userId)) {
    res.status(400)
    throw new Error("User is already a member of this project")
  }

  project.members.push(userId)
  await project.save()

  res.json(project)
})

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addProjectMember,
}
