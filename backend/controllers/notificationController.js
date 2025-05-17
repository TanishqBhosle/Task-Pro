const asyncHandler = require("express-async-handler")
const Notification = require("../models/Notification")

// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50)

  res.json(notifications)
})

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id
// @access  Private
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)

  if (!notification) {
    res.status(404)
    throw new Error("Notification not found")
  }

  // Check if notification belongs to user
  if (notification.user.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to update this notification")
  }

  notification.read = true
  await notification.save()

  res.json(notification)
})

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, read: false }, { read: true })

  res.json({ message: "All notifications marked as read" })
})

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)

  if (!notification) {
    res.status(404)
    throw new Error("Notification not found")
  }

  // Check if notification belongs to user
  if (notification.user.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to delete this notification")
  }

  await notification.deleteOne()

  res.json({ message: "Notification removed" })
})

module.exports = {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
}
