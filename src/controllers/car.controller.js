const CarServices = require('../services/car.services')
const ProductInCartServices = require('../services/product.in.cart')
const ProductServices = require('../services/product.services')

const addToCart = async (req, res) => {
  try {
    const { id:productId } = req.params
    const { userId,quantity } = req.body
    console.log("id",productId)
    const resultProduct = await ProductServices.findOne(productId)
    console.log("aca idcart",productId)
    const {id:cartId} = await CarServices.findByUserId(userId)
    console.log("aca idcart",cartId)
    if (resultProduct) {
      const { price } = resultProduct
      partialPrice=price*quantity
      type = 'incart'
      // quantity = 1
      const result = await ProductInCartServices.add(
        cartId,
        productId,
        quantity,
        partialPrice,
        type,
      )
      if (result) {
        const cartOfUser = await CarServices.find(cartId)
        console.log("datos del carrito del usuario",cartOfUser)
        const sumOfTotalPrice=cartOfUser.total_price+partialPrice
        cartOfUser.update({total_price:sumOfTotalPrice})
        // const resultProductChangeQuantity= await ProductServices.changeQuantity(id)
        res.status(201).json({ message: 'product inserted into cart' })
      } else {
        res.status(400).json({ message: 'something wrong' })
      }
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const create = async (req, res) => {
  try {
    const result = await CarServices.create()
    if (result) {
      res.status(201).json(result)
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error.json)
  }
}

const allProductsInCart = async (req, res) => {
  try {
    const { id:userId } = req.params

    const {id:cartId} = await CarServices.findByUserId(userId)
    const result = await ProductInCartServices.findAllProducts(cartId)
    if (result) {
      res.status(201).json(result)
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error.json)
  }
}

module.exports = { create, allProductsInCart, addToCart }
