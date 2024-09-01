const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  company: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  password:{
    type: String
  },
  avatar:{
    type:String
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  delete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);

const init = async () => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("123456", salt);
  const userModel = model("User");
  var user = await userModel.find({ email: "admin@gmail.com" }, "");
  var admin = new userModel({
    company: "Admin",
    username: "Admin",
    email: "admin@gmail.com",
    password: password,
    role: "admin",
  });
  if (!user[0]) admin.save();
};

init();
