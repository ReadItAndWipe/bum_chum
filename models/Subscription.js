const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    size: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = Subscription = mongoose.model('subscription', SubscriptionSchema) 