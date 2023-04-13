import { Router } from "express";
import { productsRouter } from "./productRouter";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";

export const rootRouter = Router()

rootRouter.use("/user", userRouter)
rootRouter.use("/products", productsRouter)
rootRouter.use("/auth", authRouter)
