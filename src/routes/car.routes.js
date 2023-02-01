const {Router}=require("express")
const {addToCart} = require("../controllers/car.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router=Router()

/**
 * @openapi
 * /api/v1/cart/{id}:
 *   post:
 *     summary: add a product into cart by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: Numeric Id of the product to insert into cart
 *     tags: [Add Product in Cart]
 *     requestBody:
 *       description: Required fields to add a product in a cart
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productInCart'
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
 *                    example: product added
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
 */


// router.post("/",addToCart)
router.post("/:id",authMiddleware,addToCart)

module.exports=router
