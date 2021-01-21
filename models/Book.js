const mongoose = require('mongoose')

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
  user:{
      
  }
}, {timestamps: true})


module.exports = mongoose.model('Books', Books)
