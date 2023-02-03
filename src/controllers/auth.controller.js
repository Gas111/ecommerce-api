const AuthServices = require('../services/auth.services')
const CarServices = require('../services/car.services')
const transporter = require('../utils/mailer')

const register = async (req, res) => {
  try {
    const {email,password} = req.body
    const result = await AuthServices.register(email,password)
    if (result) {
      const {id}=result
      const resultCar = await CarServices.create(id)
      if (resultCar)
      {
console.log(result.email)
      await transporter.sendMail({
        to: result.email,
        from: 'gastoncolque@gmail.com',
        cc:"gastoncolque@gmail.com",
        subject: 'Email confirmation',
        html:'<h1>Tienes q confirmar tu email en siguiente link <a href="" target="">Link</a></h1>',})
      res.status(201).json({ message: 'user created' })




      }else{

        res.status(400).json({ message: 'something wrong' })
      }
      
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const confirm = async (req, res) => {
  try {
    const user = req.body
    const result = await AuthServices.confirm(user)
    if (result) {
      res.status(201).json({ message: 'user confirm email' })
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error.json)
  }
}
const login = async (req, res) => {
  try {
    const { password, email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'not email provided' })
    }

    if (!password) {
      return res.status(400).json({ message: 'not password provided' })
    }

    const result = await AuthServices.login({ password, email })

    if (result.isValid) {
      const { username, id, email } = result.result
      let userData = { username, id, email }

      const token = AuthServices.genToken(userData)
      userData.token=token
      res.status(200).json(userData)
    } else {
      res.status(400).json({ message: 'user not found' })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}
const reset = async (req, res) => {
  try {
    const user = req.body
    const result = await AuthServices.reset(user)
    if (result) {
      res.status(201).json({ message: 'user reset' })
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { register, login, confirm, reset }
