const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI')

const db = process.env.MONGODB_URI || 'mongodb://localhost/bum_chum';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas connected');
  } catch (error) {
      console.error(error.message);
      process.exit(1)
  }
};

module.exports = connectDB; 