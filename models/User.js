const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
    unique: true,
  }
});

// plugin the passport-local-mongoose middleware with our User schema
UserSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model('user', UserSchema) 