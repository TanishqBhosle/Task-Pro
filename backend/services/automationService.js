const Task = require("../models/Task")
const Notification = require("../models/Notification")
const User = require("../models/User")
const Automation = require("../models/Automation") // Import the Automation model

/**
 * Process an automation based on a trigger event
 * @param {string} trigger - The trigger type
 * @param {Object} data - The data related to the trigger
 */
const processAutomation = async (trigger, data) => {
  try {
    // Find all automations that match the trigger
    const automations = await Automation.find({ trigger, isActive: true })

    for (const automation of automations) {
      // Check if the condition is met
      const conditionMet = evaluateCondition(automation.condition, data)

      if (conditionMet) {
        // Execute the action
        await executeAction(automation.action, data, automation.createdBy)
      }
    }
  } catch (error) {
    console.error("Error processing automation:", error)
  }
}

/**
 * Evaluate if a condition is met
 * @param {Object} condition - The condition to evaluate
 * @param {Object} data - The data to check against
 * @returns {boolean} - Whether the condition is met
 */
const evaluateCondition = (condition, data) => {
  if (!condition || !condition.field || !condition.operator) {
    return true // No condition means always execute
  }

  const { field, operator, value } = condition
  const dataValue = data[field]

  switch (operator) {
    case "equals":
      return dataValue === value
    case "not_equals":
      return dataValue !== value
    case "contains":
      return dataValue && dataValue.includes(value)
    case "greater_than":
      return dataValue > value
    case "less_than":
      return dataValue < value
    default:
      return false
  }
}

/**
 * Execute an automation action
 * @param {Object} action - The action to execute
 * @param {Object} data - The data related to the trigger
 * @param {string} userId - The ID of the user who created the automation
 */
const executeAction = async (action, data, userId) => {
  const { type, data: actionData } = action

  switch (type) {
    case "update_task":
      await Task.findByIdAndUpdate(data._id, actionData)
      break
    case "create_notification":
      await Notification.create({
        title: actionData.title,
        message: actionData.message || "Automated notification",
        type: actionData.type || "info",
        user: actionData.userId || userId,
        relatedTo: {
          model: "Task",
          id: data._id,
        },
      })
      break
    case "assign_task":
      await Task.findByIdAndUpdate(data._id, { assignedTo: actionData.userId })
      break
    default:
      console.error("Unknown action type:", type)
  }
}

module.exports = {
  processAutomation,
}
