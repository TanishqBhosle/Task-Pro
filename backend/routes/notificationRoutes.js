const express = require("express")
const router = express.Router()
const {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} = require("../controllers/notificationController")
const { protect } = require("../middlewares/authMiddleware")

router.get("/", protect, getNotifications)
router.put("/:id", protect, markNotificationAsRead)
router.put("/read-all", protect, markAllNotificationsAsRead)
router.delete("/:id", protect, deleteNotification)

module.exports = router
