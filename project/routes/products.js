const express = require('express');
const router = express.Router();

const productService = require('../services/productService');

router.get('/all', productService.getAll);
router.get('/:id', productService.getOne);
router.post('/add', productService.add);
router.put('/:id', productService.update);
router.put('/:id', productService.update);
router.get('/searchByName', productService.searchByName);

module.exports = router;