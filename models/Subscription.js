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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'user',
    },
    address: {
        type: String,
        required: true,
    },
    rolls: [{}
    ],
});

module.exports = Subscription = mongoose.model('subscription', SubscriptionSchema) 