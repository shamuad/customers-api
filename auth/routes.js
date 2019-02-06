const { Router } = require('express')
const { toJWT, toData} = require('./jwt')

const router = new Router()

router.post('/logins', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    } else {
        return res.send({
            jwt: toJWT({ userId: 1 })
        })
    }
})

router.get('/secret-endpoint', (req, res) => {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      try {
        const data = toData(auth[1])
        res.send({
          message: 'Thanks for visiting the secret endpoint.',
          data
        })
      }
      catch(error) {
        res.status(400).send({
          message: `Error ${error.name}: ${error.message}`,
        })
      }
    }
    else {
      res.status(401).send({
        message: 'Please supply some valid credentials'
      })
    }
  })

module.exports = router