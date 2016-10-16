var hyena = require('hyena'),
    connection = require('hyena/lib/mysql'),
    Schema = hyena.Schema;

var ProductSchema = new Schema({
    sku: { type: 'string', required: true },
    title: { type: 'string', required: true },
    description: [String],

    brand: String,
    type: String,

    pricing: {
        price: Number,
        oldPrice: Number,
        inStock: String
    },

    details: {
        sizes: [String],
        color: String,
        structure: [String]
    },

    images: [String],
    seo: {
        title: String,
        meta: String,
        keywords: String
    }

});

module.exports = hyena.model('Product', ProductSchema);
