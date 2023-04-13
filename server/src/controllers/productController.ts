import { Request, Response } from "express"

const {Product} = require("../models/models")

export const getAllProducts = async (req: Request, res: Response) => {
    const prod = await Product.findAll()
    res.json(prod)
}
export const getOneProduct = async (req: Request, res: Response) => {
    const prod = await Product.findByPk(req.params.id)
    res.json(prod)
}
export const postNewProduct = async (req: Request, res: Response) => {
    const prod = await Product.create(req.body)
    res.json(prod)
}