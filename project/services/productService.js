const ProductModel = require('../models/product');

module.exports = {
    getAll: (req, res) => {
        ProductModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    },
    add: async (req, res) => {
        try {
            const savedItem = await new ProductModel(req.body).save();
            res.json(savedItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await ProductModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const item = await ProductModel.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                {
                    new: true
                }
            );
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchByName: async (req, res) => {
        try {
            const { query, page, limit } = req.query;
            const regex = new RegExp(query, 'i');
            const options = {
                skip: (page - 1) * limit,
                limit: parseInt(limit)
            };

            const [products, total] = await Promise.all([
                ProductModel.find({ name: regex }, {}, options),
                ProductModel.countDocuments({ name: regex })
            ]);

            res.json({ products, total });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}