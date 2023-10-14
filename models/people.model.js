const mongoose = require('mongoose')

const peopleSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [2, 'first name must be longer than 1 character'],
        required: [true, 'skal udfyldes']
    },
    lastName: {
        type: String,
        required: [true, 'skal udfyldes']
    },
    email: {
        type: String,
        index: { unique: true }
    },
    newsLetter: {
        type: Boolean, 
        default: false
    },
})

module.exports = mongoose.model('People', peopleSchema, 'people')