const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Books = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
      type: Number,
      required: true
  },
  quantity: {
      type: Number,
      default: 1
  },
  pages: {
      type: Number,
      required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})


module.exports = mongoose.model('Book', Books)
