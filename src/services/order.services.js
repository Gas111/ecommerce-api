const { order } = require('../models')

class OrderServices {
  static async create(name,price,availableQty,type,userId) {
    try {
      console.log(email, password)
      const result = await order.create({ name,price,available_qty:availableQty,type,user_id:userId })
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async allProducts() {
    try {
      const result = await order.find({ where: {} })
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = OrderServices
