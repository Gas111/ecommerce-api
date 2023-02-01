const { car } = require('../models')

class CarServices {
  static async create(id) {
    try {
      console.log(id)
      const result = await car.create({user_id:id})
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async remove(id) {
    try {
      const result = await car.delete({ where: {id} })
      return result
    } catch (error) {
      throw error
    }
  }
  static async clear() {
    try {
      const result = await car.deleteAll()
      return result
    } catch (error) {
      throw error
    }
  }

  static async findAll() {
    try {
      const result = await car.findAll()
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = CarServices
