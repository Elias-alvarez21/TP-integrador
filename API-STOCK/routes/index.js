const express = require('express');
const authRouter = require('./auth.router');
const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const movementsRouter = require('./movements.router');
const validator=require("../middlewares/validator.login");

function routes(app) {
const router = express.Router();
 app.use('/api/v1', router);//endpoint base 
    router.use('/auth', authRouter);
    router.use('/categories',validator, categoriesRouter);
    router.use('/products',validator, productsRouter);
    router.use('/movements',validator, movementsRouter);
 }

module.exports = routes;