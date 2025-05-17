"use client"

import { useState, useEffect } from "react"
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../services/notificationService"

const NotificationList = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const data = await getNotifications()
      setNotifications(data)
      setError("")
    } catch (error) {
      setError("Failed to fetch notifications")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id)
      setNotifications((prev) =>
        prev.map((notification) => (notification._id === id ? { ...notification, read: true } : notification)),
      )
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead()
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
    }
  }

  if (loading) {
    return <div>Loading notifications...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (notifications.length === 0) {
    return <div>No notifications</div>
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Notifications</h3>
        <button
          onClick={handleMarkAllAsRead}
          className="btn btn-secondary"
          disabled={notifications.every((n) => n.read)}
        >
          Mark All as Read
        </button>
      </div>
      <div className="card-body">
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li key={notification._id} className={`notification-item ${notification.read ? "read" : "unread"}`}>
              <div className="notification-content">
                <h4 className="notification-title">{notification.title}</h4>
                <p className="notification-message">{notification.message}</p>
                <small className="notification-time">{new Date(notification.createdAt).toLocaleString()}</small>
              </div>
              {!notification.read && (
                <button onClick={() => handleMarkAsRead(notification._id)} className="btn btn-primary btn-sm">
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NotificationList
