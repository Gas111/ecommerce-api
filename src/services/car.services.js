const { car } = require('../models')

class CarServices {
  static async create(id) {
    try {
      const result = await car.create({user_id:id})
      return result
    } catch (error) {
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
  static async findByUserId(userId) {
    try {
      const result = await car.findOne({where : {user_id:userId}})
      return result
    } catch (error) {
      throw error
    }
  }
  static async find(id) {
    try {
      const result = await car.findOne({where:{id}})
      return result
    } catch (error) {
      throw error
    }
  }

}

module.exports = CarServices
