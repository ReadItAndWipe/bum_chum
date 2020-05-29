const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'user',
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'user',
    },
    name: {
      type: String,
      required: true,
  },
    address: {
        type: String,
        required: true,
    },
    rolls: {
      type: mongoose.Schema.Types.ObjectId,
      res: 'roll',
    }
});

module.exports = Order = mongoose.model('order', OrderSchema) 