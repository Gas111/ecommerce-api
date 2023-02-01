const { product_in_cart } = require('../models')
// const { Op } = require('sequelize')

/** 
* productInCart:
*       type: object
*       properties:
*         cartId:
*           type: int
*           example: 1
*         productId:
*           type: int
*           example: 1
*         quantity:
*           type: int
*           example: 1
*         price:
*           type: int
*           example: 1000
*         type:
*           type: enum (pending - incart- purchased)
*           example: pending
*/ 

class ProductInCartServices {
  static async add(cartId, productId, quantity, price, type) {
    try {
      console.log(cartId, productId, quantity, price, type)
      
      const result = await product_in_cart.create({
        cart_id:cartId, product_id:productId, quantity, price, type
      })
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async del() {
    try {
      const result = await product_in_cart.delete(
      )
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = ProductInCartServices
