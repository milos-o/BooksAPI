const mongoose = require('mongoose')

const Users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
      type: Boolean
  }
}, {timestamps: true})


module.exports = mongoose.model('Users', Users)
