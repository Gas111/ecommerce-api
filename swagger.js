const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const options = {
  apis: [
    './src/routes/auth.routes.js',
    './src/models/users.js',
    './src/models/product.js',
    './src/routes/product.routes.js',
    './src/models/product_in_cart.js',
    './src/routes/car.routes.js',
    './src/models/car.js',
    './src/models/order.js',
    './src/routes/order.routes.js',
    
  ],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce - node js',
      version: '1.0.0',
      description: 'API para ecommerce made by GASTON COLQUE',
    },
  },
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) => {
  // generar la ruta donde se mostrara la documentacion.
  // app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
 
  app.get('/docs.json', (req, res) => {
    res.setHeader({ 'Content-Type': 'application/json' })
    res.send(swaggerSpec)
  })

  console.log(`la documentacion esta disponible en ${process.env.URL}`)
}

module.exports = swaggerDocs
