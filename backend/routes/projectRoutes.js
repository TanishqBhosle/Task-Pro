const express = require("express")
const router = express.Router()
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addProjectMember,
} = require("../controllers/projectController")
const { protect } = require("../middlewares/authMiddleware")

router.route("/").get(protect, getProjects).post(protect, createProject)

router.route("/:id").get(protect, getProject).put(protect, updateProject).delete(protect, deleteProject)

router.post("/:id/members", protect, addProjectMember)

module.exports = router
