const router = require('express').Router();
const forceHTTPS = require('../middleware/forceHTTPS');

// static page routes
const staticRoutes = require('./static');

// static resource routes
const authRoutes = require('./auth');
const productRoutes = require('./product');
const userRoutes = require('./user');
const httpStatusRoutes = require('./http');
const testRoutes = require('./test');
const cartRoutes = require('./cart');

// dynamic resource routes
// no-dynamic-routes

router.use('/', forceHTTPS, staticRoutes);
router.use('/auth', authRoutes);
router.use(['/cart','/carts'], cartRoutes);
router.use(['/product', '/products'], productRoutes);
router.use(['/user', '/users'], userRoutes);
router.use(['/http', '/https'], httpStatusRoutes);
router.use('/test', testRoutes);

module.exports = router;
