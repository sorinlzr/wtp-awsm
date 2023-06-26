import { mongoose } from 'mongoose';
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
  next();
});

// @desc Create Model
const User = mongoose.model("User", UserSchema);
export default User;
