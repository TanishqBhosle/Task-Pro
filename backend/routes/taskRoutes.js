const express = require("express")
const router = express.Router()
const { createTask, getTasksByProject, getTask, updateTask, deleteTask } = require("../controllers/taskController")
const { protect } = require("../middlewares/authMiddleware")

router.route("/").post(protect, createTask)

router.route("/:id").get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask)

router.get("/project/:projectId", protect, getTasksByProject)

module.exports = router
