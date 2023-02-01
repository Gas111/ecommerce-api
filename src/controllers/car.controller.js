const CarServices = require('../services/car.services')
const ProductInCartServices = require('../services/product.in.cart')
const ProductServices = require('../services/product.services')


const addToCart = async (req, res) => {
  try {
    const {id}=req.params
    console.log(id)

    const resultProduct= await ProductServices.findOne(id)
    console.log(resultProduct)
    if(resultProduct)
    {
    // producto encontrado. 
    const {price} = resultProduct
    productId=id
    type=""
    quantity=1
    }
    const result = await ProductInCartServices.add(cartId, productId, quantity, price, type)
    if (result) {
      console.log(result)
       res.status(201).json(result)
    } else {
      res.status(400).json({ message: 'something wrong' })
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

const allCar = async (req, res) => {
    try {
      const result = await CarServices.findAll()
      if (result) {
        res.status(201).json(result)
      } else {
        res.status(400).json({ message: 'something wrong' })
      }
    } catch (error) {
      res.status(400).json(error.json)
    }
  }


module.exports = {create, allCar , addToCart}
