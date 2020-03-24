const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    userTo : {
        // User 모델의 정보를 모두 불러옴.
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userForm: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{ timestamps: true});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber };