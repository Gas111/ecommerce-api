const { product } = require('../models')
const { Op } = require('sequelize')

class ProductServices {
  static async create(name, price, availableQty, type, userId) {
    try {
      console.log(name, price, availableQty, type, userId)
      const result = await product.create({
        name,
        price,
        available_qty: availableQty,
        type,
        user_id: userId,
      })
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async allProducts() {
    try {
      const result = await product.findAll({
        where: { available_qty: { [Op.gt]: 1 } },
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async findOne(id) {
    try {
      const result = await product.findOne({
        where: { id },
      })
      return result
    } catch (error) {
      throw error
    }
  }
  
  static async changeQuantity(id) {
    try {
      const productToChangeQuantity = await product.findOne({
        where: { id },
      })
      
      productToChangeQuantity.quantity= productToChangeQuantity -1 
      const result=await productToChangeQuantity.save()
      return result
    } catch (error) {
      throw error
    }
  }




}

module.exports = ProductServices
