const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { tokenGenerate } = require('../helpers/jwt')


class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({ name, email, password })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && comparePassword(password, user.password)) {
                    let payload = {
                        id: user._id
                    }

                    let token = tokenGenerate(payload)
                    res.status(200).json({ token })
                } else {
                    next({
                        status: 400,
                        message: `Invalid Email/Password`
                    })
                }
            })
            .catch(next)

    }

    static loginGoogle(req, res, next) {

    }
}

module.exports = UserController