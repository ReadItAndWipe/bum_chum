const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  email: {
    type: String, 
    required: true,
    unique: true,
  },
  password: {
    type: String, 
    required: true,
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    res: 'subscription'
  }
});

module.exports = User = mongoose.model('user', UserSchema) 