const asyncHandler = require("express-async-handler")
const Automation = require("../models/Automation")
const Project = require("../models/Project")

// @desc    Create a new automation
// @route   POST /api/automations
// @access  Private
const createAutomation = asyncHandler(async (req, res) => {
  const { name, description, trigger, condition, action, project } = req.body

  if (!name || !trigger || !action) {
    res.status(400)
    throw new Error("Please provide name, trigger, and action")
  }

  // If project is specified, check if user has access
  if (project) {
    const projectExists = await Project.findById(project)
    if (!projectExists) {
      res.status(404)
      throw new Error("Project not found")
    }

    // Check if user is owner or member of the project
    if (projectExists.owner.toString() !== req.user._id.toString() && !projectExists.members.includes(req.user._id)) {
      res.status(403)
      throw new Error("Not authorized to create automations for this project")
    }
  }

  const automation = await Automation.create({
    name,
    description,
    trigger,
    condition,
    action,
    project,
    createdBy: req.user._id,
  })

  res.status(201).json(automation)
})

// @desc    Get all automations for a user
// @route   GET /api/automations
// @access  Private
const getAutomations = asyncHandler(async (req, res) => {
  const { project } = req.query

  const query = { createdBy: req.user._id }

  // If project is specified, filter by project
  if (project) {
    query.project = project
  }

  const automations = await Automation.find(query).sort({ createdAt: -1 })

  res.json(automations)
})

// @desc    Get a single automation
// @route   GET /api/automations/:id
// @access  Private
const getAutomation = asyncHandler(async (req, res) => {
  const automation = await Automation.findById(req.params.id)

  if (!automation) {
    res.status(404)
    throw new Error("Automation not found")
  }

  // Check if user is the creator
  if (automation.createdBy.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to view this automation")
  }

  res.json(automation)
})

// @desc    Update an automation
// @route   PUT /api/automations/:id
// @access  Private
const updateAutomation = asyncHandler(async (req, res) => {
  const automation = await Automation.findById(req.params.id)

  if (!automation) {
    res.status(404)
    throw new Error("Automation not found")
  }

  // Check if user is the creator
  if (automation.createdBy.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to update this automation")
  }

  const updatedAutomation = await Automation.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.json(updatedAutomation)
})

// @desc    Delete an automation
// @route   DELETE /api/automations/:id
// @access  Private
const deleteAutomation = asyncHandler(async (req, res) => {
  const automation = await Automation.findById(req.params.id)

  if (!automation) {
    res.status(404)
    throw new Error("Automation not found")
  }

  // Check if user is the creator
  if (automation.createdBy.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to delete this automation")
  }

  await automation.deleteOne()

  res.json({ message: "Automation removed" })
})

module.exports = {
  createAutomation,
  getAutomations,
  getAutomation,
  updateAutomation,
  deleteAutomation,
}
