let mongoose = require('../bin/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let schema = new Schema({
    id_order: Number,
    description: String,
    information: String,
    number: Number,
    name: String,
    phone: String,
    email: String,
    juid: Number,
    prepayment: Number,
    status: {
        type: Number,
        default: 0
    },
    file: String,
    time: Date,
    prioity: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    action: {
        type: Boolean,
        default: true
    }
});

schema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderId'
});
module.exports = mongoose.model('Order', schema);