const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'skal udfyldes']
    },
    price: {
        type: Number,
        required: [true, 'skal udfyldes']
    },
    image: {
        type: String, 
        default: 'photo-coming-soon.jpg'
    },
})

module.exports = mongoose.model('Product', productSchema, 'products')