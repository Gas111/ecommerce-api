const {users} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthServices {
  static async register(email,password) {
    try {
      console.log(email,password)
      const result = await users.create({email,password})
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async login(loginData) {
    try {
      const { password, email } = loginData

      const result = await users.findOne({ where: { email } })
      if (result) {
        const isValid = bcrypt.compareSync(password, result.password)

        return isValid ? { isValid, result } : { isValid }
      }
      return { isValid: false }
    } catch (error) {
      throw error
    }
  }

  static genToken(data) {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '20m',
        algorithm: 'HS512',
      })
      return token
    } catch (error) {
      throw error
    }
  }
}

module.exports = AuthServices
