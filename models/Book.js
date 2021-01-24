const mongoose = require('mongoose')

const Books = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index:true,
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
      required: true,
      min:10,
      max:5000
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Users"
  }
}, {timestamps: true})


module.exports = mongoose.model('Books', Books)
