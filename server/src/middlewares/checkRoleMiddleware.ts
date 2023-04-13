import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import env from "dotenv"
import { UserType } from "../types/userTypes"

env.config()

type Locals = {
    user?: {
        password: string
        email: string
        role: string
    }
}

export const checkRoleMiddleware = (req: Request, res: Response<{}, Locals>, next: NextFunction) => {
    if(req.method === "OPTIONS"){
        next()
    }
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.json({"message": "Пользователь не авторизован"})
    }
    const decodedToken = jwt.verify(token as string, process.env.SECRET_KEY as string) as JwtPayload
    if(decodedToken.role != "ADMIN"){
        return res.json({message: "У вас нет доступа"})
    }
    res.locals = decodedToken
    next()
} 