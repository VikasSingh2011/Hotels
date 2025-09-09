const mongoose = require('mongoose');

//here we define the menuItem Schema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ['Sweet', "spicy", 'sour'],
    required: true,
  },
  is_drink: {
    type: Boolean,
    required: false,
  },
  ingredients: {
    type: [String],
    default: []
  },
  num_sales: {
    type: Number,
    default: 0
  }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;//here we export this MenuItem in server.js
