import { Router } from "express";
import { check, login, register } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const authRouter = Router()

authRouter.post("/register", register)
authRouter.post('/login', login)
authRouter.get('/check', authMiddleware, check)