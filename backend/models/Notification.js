const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a notification title"],
    },
    message: {
      type: String,
      required: [true, "Please add a notification message"],
    },
    type: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info",
    },
    read: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    relatedTo: {
      model: {
        type: String,
        enum: ["Project", "Task", "Automation"],
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Notification", notificationSchema)
