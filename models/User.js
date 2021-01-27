const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      required:true,
      default:0
  },
  book: [
    { type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
}, {timestamps: true})


module.exports = mongoose.model('User', Users)
