const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        price: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        }
    }, {timestamps : true}
);


module.exports = mongoose.model('product',ProductSchema);
