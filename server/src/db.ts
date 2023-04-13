import { Sequelize } from "sequelize";
import env from "dotenv"

const port = process.env.DB_PORT
const Port = port?+port:undefined

env.config()
export const sequelize =  new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: Port
    }

)