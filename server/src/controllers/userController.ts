import { Request, Response } from "express"

const {User} = require("../models/models")

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.findAll()
    res.json(users)
}