const CarServices = require('../services/car.services')
const ProductInCartServices = require('../services/product.in.cart')
const ProductServices = require('../services/product.services')

const addToCart = async (req, res) => {
  try {
    const { id } = req.params
    const { cartId } = req.body
    // aca puedo agregar el precio q me envie el front, pq el carrito tiene el precio total. 
    
    console.log(id)
    const resultProduct = await ProductServices.findOne(id)
    if (resultProduct) {
      const { price } = resultProduct
      const productId = id
      type = 'incart'
      quantity = 1
      const result = await ProductInCartServices.add(
        cartId,
        productId,
        quantity,
        price,
        type,
      )
      if (result) {
        console.log(result)
        const resultProductChangeQuantity= await ProductServices.changeQuantity(id)
        res.status(201).json(result)
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
    const { id } = req.params
    const result = await ProductInCartServices.findAllProducts(id)
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
