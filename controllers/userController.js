const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//@desc     Auth user/set token
//route     POST /api/users/auth
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth user" });
});

//@desc     Register a new user
//route     POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  //destructuring the body data
  const { name, email, mobile, password } = req.body;

  //to check the user is already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //create user
  const user = await User.create({
    name,
    email,
    mobile,
    password,
  });

  //checking the user is created
  if (user) {
    //creating the token
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Logout user
//route     POST /api/users/logout
//@access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout user" });
});

//@desc     Get user profile
//route     GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User profile" });
});

//@desc     Update user profile
//route     PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update user profile" });
});

//@desc     Delete user profile
//route     DELETE /api/users/profile
//@access   Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete user profile" });
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
