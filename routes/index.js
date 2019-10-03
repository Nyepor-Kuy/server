const router = require('express').Router()
const userRouter = require('./user')
const pegipegiRouter = require('./pegipegi')

router.use('/users', userRouter)
router.use('/pegipegi', pegipegiRouter)

module.exports = router