const mongoose = require('mongoose');

const RollSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    unique: true,
  },
  description: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  }
});

module.exports = Roll = mongoose.model('roll', RollSchema) 