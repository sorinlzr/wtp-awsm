import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { createOne, updateOne, deleteOne, getOne, getAll } from "./handlersFactory.js"

const userController = {};
// @desc Create a User
const createUser = createOne(User);

// @desc Update a User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstname: req.body.firstname,
      lastname: req.body.firstname,
      email: req.body.email,
      username: req.body.username,
    },
    { new: true }
  );

  res.status(200).json({ data: user });
});

// @desc Update Passwoed
const changeUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 10),
    },
    { new: true }
  );

  res.status(200).json({ data: user });
});

// @desc Get All Users
const allUsers = getAll(User);

// @desc get a single user
const getUser = getOne(User, "user");

// @desc delete a user
const deleteUser = deleteOne(User, "user");

userController.createUser = createUser;
userController.updateUser = updateUser;
userController.changeUserPassword = changeUserPassword;
userController.allUsers = allUsers;
userController.getUser = getUser;
userController.deleteUser = deleteUser;

export default userController;
