// leemos el token valido. y luego autorizamos o no acceder a una ruta.
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authMiddleware = (req, res, next) => {
  //se envia en los headers de la
  let { authorization: token } = req.headers
  token = token.replace('Bearer ', '')
  console.log(token)
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      algorithm: 'HS512',
    },
    (error, decoded) => {
      if (error) {
        res.status(400).json({ message: 'invalid token' })
      } else {
        next()
        console.log(decoded)
      }
    },
  )
}

module.exports = authMiddleware
