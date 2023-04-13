import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import env from "dotenv"

const {User, Basket} = require("../models/models")

env.config()

export const register = async (req: Request, res: Response) => {
    try{
        const candidate = await User.findOne({where: { email: req.body.email }})
        if(candidate) {
            throw Error("Пользователь с таким Email существует")
        }
        const hashPassword = await bcrypt.hash(req.body.password, 3)
        const user = await User.create({email: req.body.email, password: hashPassword, role: req.body.role})
        const basket = await Basket.create({user_id: user.id})
        const token = jwt.sign({email: user.email, password: user.password, role: user.role}, process.env.SECRET_KEY as string, {expiresIn: '24h'})
        res.json({token})
    }
    catch(e){
        console.log(e)
    }
}
export const login = async (req: Request, res: Response) => {
    const user = await User.findOne({where: {email: req.body.email}})
    if(!user){
        throw Error("Такого пользоватя не существует")
    }
    let comparePasswords = bcrypt.compareSync(req.body.password, user.password)
    if(!comparePasswords){
        throw Error("Неверный пароль")
    }
    const token = jwt.sign({email: user.email, password: user.password, role: user.role}, process.env.SECRET_KEY as string, {expiresIn: '24h'})
    res.json({token})
}

export const check = (req: Request, res: Response) => {
    const user = res.locals
    console.log(user)
    const token = jwt.sign({email: user.email, password: user.password, role: user.role}, process.env.SECRET_KEY as string, {expiresIn: '24h'})
    res.json({token})
}