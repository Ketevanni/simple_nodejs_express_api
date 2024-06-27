const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    warehouses: [{
        name: { type: String },
        stock: { type: Number }
    }],
    status: { type: String, enum: ['on sale', 'not on sale'], default: 'not on sale' },
    characteristics: { type: String },
}, {
    collection: 'products',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;