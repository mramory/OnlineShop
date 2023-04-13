import { Router } from "express";
import { getAllProducts, getOneProduct, postNewProduct } from "../controllers/productController";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

export const productsRouter = Router()

productsRouter.get("/", getAllProducts)
productsRouter.get("/:id", getOneProduct)
productsRouter.post('/', checkRoleMiddleware, postNewProduct)

