const express = require('express');
const MovementService = require('../services/movement.service');
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();
router.get('/:id', function(req, res) { MovementService.get(req.params.id, res) })
router.post('/', function(req, res) { MovementService.create(req, res) })
router.delete('/:product/:id', function(req, res) { MovementService.delete(req, res) })
module.exports = router;