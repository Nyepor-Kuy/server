const routes = require('express').Router();
const pegipegiController = require('../controllers/pegipegi')

routes.get('/', pegipegiController.find)

module.exports = routes