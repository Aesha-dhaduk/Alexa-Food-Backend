// models/User.js
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      // select: false, // hides password when fetching users
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postcode: {
      type: String, // use string instead of number (postcodes can have letters/leading 0s)
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    regionstate: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },  { timestamps: true }
);



module.exports = mongoose.model("User", UserSchema);
