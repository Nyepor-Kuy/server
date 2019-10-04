const routes = require('express').Router();
const pegipegiController = require('../controllers/pegipegi')

routes.post('/', pegipegiController.find)

module.exports = routes