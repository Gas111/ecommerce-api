const {Router}=require("express")
const {addToCart, allProductsInCart} = require("../controllers/car.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router=Router()

/**
 * @openapi
 * /api/v1/cart/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: add a product into cart by parameter ProductId
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric Id of the product to insert into cart
 *     tags: [Add Product in Cart]
 *     requestBody:
 *       description: Required fields to add a product in a cart
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/car'
 *     responses:
 *        201:
 *          description: Added
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: product inserted into cart
 *        400:
 *          description: Validation error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: product not added
 * /api/v1/cart/allproducts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all products in cart by UserId
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric Id of the User
 *     tags: [Get All Products in Cart]
 *     responses:
 *        200:
 *          description: All Products in Cart
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/productInCart'
 *        400:
 *          description: get error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: not find data
 */


// router.post("/",addToCart)
// router.post("/:id",authMiddleware,addToCart)
router.post("/:id",addToCart)
router.get("/allproducts/:id",allProductsInCart)

module.exports=router
