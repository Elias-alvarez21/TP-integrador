const express = require('express');
const AuthService = require('./../services/auth.service');
const validatorLogin = require('./../middlewares/validator.login');

const router = express.Router();
const service = new AuthService();
router.post('/', function(req, res) { service.auth(req, res) })
router.post('/register', function(req, res) { service.register(req, res) })

module.exports = router;