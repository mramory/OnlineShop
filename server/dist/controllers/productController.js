"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewProduct = exports.getOneProduct = exports.getAllProducts = void 0;
const { Product } = require("../models/models");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = yield Product.findAll();
    res.json(prod);
});
exports.getAllProducts = getAllProducts;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = yield Product.findByPk(req.params.id);
    res.json(prod);
});
exports.getOneProduct = getOneProduct;
const postNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = yield Product.create(req.body);
    res.json(prod);
});
exports.postNewProduct = postNewProduct;
