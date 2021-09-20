const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, photo } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(404)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    photo,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      photo: user.photo,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User Error Occured')
  }
})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      photo: user.photo,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.photo = req.body.photo || user.photo

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      photo: updatedUser.photo,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(401)
    throw new Error('User Not Found')
  }
})

module.exports = { registerUser, authUser, updateUserProfile }
