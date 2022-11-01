const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    contactNo: Number,
    dob: {
        type: Date,
        default: new Date()
    },
    department: String
})

const customerModel = mongoose.model('customers', customerSchema);
module.exports = customerModel;