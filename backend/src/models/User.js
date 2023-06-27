import { mongoose } from 'mongoose';
import axios from 'axios';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is Required"],
    },

    lastname: {
      type: String,
      required: [true, "Last Name is Required"],
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is Required"],
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is Required"],
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
    },

    language: {
      type: String
    },

    avatar: {
      type: String
    },
    
    isBlocked: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { toJSON: { virtuals: true } },
  { timestamps: true }
);

// @desc Get Full Name
UserSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// @desc Get intials
UserSchema.virtual("intials").get(function () {
  return `${this.firstname[0]}${this.lastname[0]}`;
});

// @desc Get post counts
UserSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

// @desc Hash Password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  if (!this.avatar) {
    const lockNumber = () => Math.floor(Math.random() * 99999) + 1;
    const avatarUrl = await generateRandomUserAvatar(lockNumber);
    this.avatar = avatarUrl;
  }
  next();
});

async function generateRandomUserAvatar(lockNumber) {
  try {
    const url = `https://loremflickr.com/640/480/people?lock=${lockNumber}`;
    const response = await axios.get(url);
    const responseUrl = response.request.res.responseUrl;
    return responseUrl;
  } catch (error) {
    throw new Error(`Network Error: ${error.message}`);
  }
}

// @desc Create Model
const User = mongoose.model("User", UserSchema);
export default User;
