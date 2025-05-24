const express = require('express');
const ProductService = require('../services/product.service');
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();
const service = new ProductService();
router.get('/', function(req, res) { service.get(req, res) })
router.post('/', function(req, res) { service.create(req, res) })
router.put('/', function(req, res) { service.update(req, res) })
router.patch('/:id', function(req, res) { service.state(req.params.id, res) })
router.delete('/:id', function(req, res) { service.delete(req.params.id, res) })
router.get('/:id/:direction',function(req,res) {service.getMovement(req,res)});

module.exports = router;