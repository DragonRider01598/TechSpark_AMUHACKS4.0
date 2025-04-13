const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // Path to local images directory
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving if it's modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate an authentication token for the user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, username: this.username, profileImage: this.profileImage }, process.env.JWT_SECRET, {
    expiresIn: '5h', //Expire token after 5 hours
  });
  return token;
};

module.exports = mongoose.model('User', userSchema);;