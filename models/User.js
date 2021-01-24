const mongoose = require('mongoose')

const Users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index:true
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
      type: Boolean,
      required:true
  },
  books: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Books"
  }]
}, {timestamps: true})


module.exports = mongoose.model('Users', Users)
