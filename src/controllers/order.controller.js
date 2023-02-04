const AuthServices = require('../services/auth.services')
const CarServices = require('../services/car.services')
const OrderServices = require('../services/order.services')
const ProductInCartServices = require('../services/product.in.cart')
const ProductInOrderServices = require('../services/product.in.order.services')
const ProductServices = require('../services/product.services')
const transporter = require('../utils/mailer')
const order = async (req, res) => {
  try {
    let totalPriceCheck = 0
    const { userId } = req.body
    const { total_price, id: cartId } = await CarServices.findByUserId(userId)
    const { id: orderId } = await OrderServices.create(userId, total_price)
    const allProductDataInCart = await ProductInCartServices.findAllProducts(
      cartId,
    )
    allProductDataInCart.forEach(async (eachProduct) => {
      const resultOfAddProducts = await ProductInOrderServices.add(
        orderId,
        eachProduct.product_id,
        eachProduct.quantity,
        eachProduct.price,
        'purchased',
      )
      const resultOfChangeQuantity = await ProductServices.changeQuantity(
        eachProduct.product_id,
        eachProduct.quantity,
      )

      // totalPriceCheck += eachProduct.price
    })
    
    await ProductInCartServices.deleteAllProducts(
      cartId,
    )

    const cartOfUser = await CarServices.findByUserId(userId)
    cartOfUser.update({ total_price: '0' })

    // allProductDataInCart.forEach(async (eachProduct) => {

    // })

    if (allProductDataInCart) {
      const result = await AuthServices.findOne(userId)
      // await transporter.sendMail({
      //   to: result.email,
      //   from: 'gastoncolque@gmail.com',
      //   cc: 'gastoncolque@gmail.com',
      //   subject: 'Email Orden Generada',
      //   html: `<h2>La Orden generada es la Nro ${orderId}</h2>`,
      // })
      res.status(201).json({ message: `order Id:${orderId} created` })
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const getAllOrders = async (req, res) => {
  try {
    const { id: userId } = req.params
    const result = await OrderServices.findOrderByUserWithModels(userId)
    if (result) {
      res.status(201).json(result)
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = { order, getAllOrders }
