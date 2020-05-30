const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription',
        autopopulate: true,
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
      ref: 'roll',
      autopopulate: true,
    }
});

OrderSchema.plugin(require('mongoose-autopopulate'));

module.exports = Order = mongoose.model('order', OrderSchema) 