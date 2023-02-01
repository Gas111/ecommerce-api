const initModels = require('./init-models')
const db=require("../utils/database")
const models=initModels(db)
if(models)
{console.log("conecting to database")
console.log(models)
}

module.exports=models