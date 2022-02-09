// implement your server here
// require your posts router and connect it here

const express = require('express');
const adapterRouter = require('./posts/posts-router')
const routerModel = express();

routerModel.use(express.json())

routerModel.use('/api/posts', adapterRouter)




module.exports = routerModel;

