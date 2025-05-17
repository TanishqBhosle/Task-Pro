const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const { errorHandler } = require("./middlewares/errorHandler")

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err.message))

const app = express()

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))

// Routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))
app.use("/api/automations", require("./routes/automationRoutes"))
app.use("/api/notifications", require("./routes/notificationRoutes"))

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MERN Stack API" })
})

// Error handler
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
