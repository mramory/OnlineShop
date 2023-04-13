import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import env from "dotenv"

env.config()

type Locals = {
    user?: {
        password: string
        email: string
        role: string
    }
}

export const authMiddleware = (req: Request, res: Response<{}, Locals>, next: NextFunction) => {
    if(req.method === "OPTIONS"){
        next()
    }
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.json({"message": "Пользователь не авторизован"})
    }
    const decodedToken = jwt.verify(token as string, process.env.SECRET_KEY as string)
    res.locals = decodedToken
    next()
} 