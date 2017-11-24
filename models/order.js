let mongoose = require('../bin/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let schema = new Schema({
    orderId: Number,
    description: {
        type: String,
        require: true
    },
    information: String,
    number: {
        type: Number,
        require: true
    },
    client: Object,
    juid: Number,
    prepayment: Number,
    status: {
        type: Number,
        default: 0
    },
    file: String,
    time: {
        type: Date,
        require: true
    },
    prioity: Number,
    tags: Array,
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