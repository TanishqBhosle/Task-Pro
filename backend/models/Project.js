const mongoose = require("mongoose")
const { PROJECT_STATUS } = require("../utils/constants")

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a project name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    status: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.ACTIVE,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Project", projectSchema)
