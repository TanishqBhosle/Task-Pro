const mongoose = require("mongoose")

const automationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for the automation"],
      trim: true,
    },
    description: {
      type: String,
    },
    trigger: {
      type: String,
      required: [true, "Please specify a trigger"],
      enum: ["task_created", "task_updated", "task_completed", "project_created"],
    },
    condition: {
      field: {
        type: String,
        enum: ["status", "priority", "assignedTo", "dueDate", "project"],
      },
      operator: {
        type: String,
        enum: ["equals", "not_equals", "contains", "greater_than", "less_than"],
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
    action: {
      type: {
        type: String,
        required: [true, "Please specify an action type"],
        enum: ["update_task", "create_notification", "assign_task"],
      },
      data: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Please provide action data"],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Automation", automationSchema)
