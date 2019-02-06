const { Router } = require('express')
const jwt = require('./jwt')

const router = new Router()

router.post('/logins', (req, res, next) => {
    jwt
        .create(req.body)
        .then(login => {
            if (!login) {
                return res.status(400).send({
                    message: 'Please supply a valid email and password'
                })
            }
            res.send({
                jwt: toJWT({ userId: 1 })
            })
        })
        .catch(error => next(error))
})

module.exports = router