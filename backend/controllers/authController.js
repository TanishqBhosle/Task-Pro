const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

// Generate JWT
const generateToken = (id) => {
  // Use environment variable or fallback to a default secret
  const secret = process.env.JWT_SECRET || "taskhub_default_secret_key_2025"
  
  try {
    return jwt.sign({ id }, secret, {
      expiresIn: "30d",
    })
  } catch (error) {
    console.error('Error generating token:', error.message)
    // Return a simple token if JWT signing fails
    return `temp_token_${id}_${Date.now()}`
  }
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    console.log('Registration attempt:', { name, email })

    if (!name || !email || !password) {
      res.status(400)
      throw new Error("Please add all fields")
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      // Generate token
      const token = generateToken(user._id)
      
      // Send response
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  } catch (error) {
    console.error('Registration error:', error.message)
    res.status(400).json({ message: error.message || "Registration failed" })
  }
})

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
}
