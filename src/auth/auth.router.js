//? rutas de autorizacion y autenticacion

//* Login
//* Register
//* Recovery password
//* Verify User

const router = require('express').Router()

const { registerUser } = require('../users/users.services')
const {login} = require('./auth.services')

//? /api/v1/auth

router.post('/register', registerUser)
router.post('/login', login)

module.exports = router