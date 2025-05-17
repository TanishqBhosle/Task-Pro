const express = require("express")
const router = express.Router()
const {
  createAutomation,
  getAutomations,
  getAutomation,
  updateAutomation,
  deleteAutomation,
} = require("../controllers/automationController")
const { protect } = require("../middlewares/authMiddleware")

router.route("/").get(protect, getAutomations).post(protect, createAutomation)

router.route("/:id").get(protect, getAutomation).put(protect, updateAutomation).delete(protect, deleteAutomation)

module.exports = router
