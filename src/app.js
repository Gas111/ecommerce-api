const express=require("express")
const app=express()
const cors=require("cors")
const morgan=require("morgan")
// const initModels = require("./models/initModels")
// const db = require("./utils/database")
const authRoutes=require("./routes/auth.routes")
const productRoutes=require("./routes/product.routes")
const carRoutes=require("./routes/car.routes")
const orderRoutes=require("./routes/order.routes")
const transporter = require("./utils/mailer")
const authMiddleware = require("./middlewares/auth.middleware")

app.use(express.json())
app.use(cors()) //origens x
app.use(morgan("tiny")) //velocity and log

// initModels()



// db.authenticate()
// .then(()=>{console.log("base de datos autenticadad") 
// }).catch((error)=>{console.log(error)})
// db.sync({force:false}).then(()=>{console.log("base de datos sincronizada")}).catch((error)=>{console.log(error)})
// module.exports=app
// app.get("/",(req,res)=>{
//     res.json({message:"welcome to my server"})
// })

// transporter.verify().then(()=>{console.log("transporter is ok")}).catch((error)=>{console.log(error)})

// const sendEmail=async()=>{
// await transporter.sendMail({
// from:"gastoncolque@gmail.com",
// to:"gastoncolque@gmail.com",
// subjetc:"Prueba de nodemailer",
// html:"<h1>hola soy gas<h1>"
// })

// }

// sendEmail()

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/product",authMiddleware, productRoutes)
app.use("/api/v1/cart",carRoutes)
app.use("/api/v1/order",orderRoutes)
module.exports=app
