const {Router}=require("express")
const {register,login,reset,confirm} = require("../controllers/auth.controller")
const router=Router()

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: create a new user into application
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to create a new user
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: user created
 *        400:
 *          description: Validation error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: user not created
 * /api/v1/auth/login:
 *   post:
 *     summary: login a user into application
 *     tags: [Login]
 *     requestBody:
 *       description: Required fields to login a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *        200:
 *          description: Logged
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/loginResponse'
 *        400:
 *          description: Validation error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: user or password incorrect
 */


router.post("/register",register)
router.post("/login",login)
router.post("/reset-pass",reset)
router.post("/confirm-email",confirm)




module.exports=router
