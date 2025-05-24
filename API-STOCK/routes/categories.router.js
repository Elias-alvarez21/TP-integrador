const express = require('express');

const CategoryService = require('../services/category.service');
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();

router.post('/',validatorLogin, function(req, res) { CategoryService.create(req, res) })
//router.get('/', function(req, res) { CategoryService.get(req, res) })
router.post("/busqueda/:category?", function(req, res) { CategoryService.get(req, res) })
module.exports = router;