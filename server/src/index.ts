import express from "express"
import env from "dotenv"
import { sequelize } from "./db"
import cors from "cors"
import { rootRouter } from "./routes/index"
const models = require("./models/models")

env.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", rootRouter)

const PORT = process.env.PORT

const start = async function(){
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(5000, () => {
            console.log(`server is listened on ${PORT} port`)
        })
    }
    catch(e){
        console.log(e)
    }
}

start()