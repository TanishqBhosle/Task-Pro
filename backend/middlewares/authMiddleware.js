const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]

      // Use environment variable or fallback to a default secret
      const secret = process.env.JWT_SECRET || "taskhub_default_secret_key_2025"
      
      // Verify token
      const decoded = jwt.verify(token, secret)

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }
