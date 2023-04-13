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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const { User, Basket } = require("../models/models");
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield User.findOne({ where: { email: req.body.email } });
        if (candidate) {
            throw Error("Пользователь с таким Email существует");
        }
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, 3);
        const user = yield User.create({ email: req.body.email, password: hashPassword, role: req.body.role });
        const basket = yield Basket.create({ user_id: user.id });
        const token = jsonwebtoken_1.default.sign({ email: user.email, password: user.password, role: user.role }, process.env.SECRET_KEY, { expiresIn: '24h' });
        res.json({ token });
    }
    catch (e) {
        console.log(e);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ where: { email: req.body.email } });
    if (!user) {
        throw Error("Такого пользоватя не существует");
    }
    let comparePasswords = bcrypt_1.default.compareSync(req.body.password, user.password);
    if (!comparePasswords) {
        throw Error("Неверный пароль");
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email, password: user.password, role: user.role }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
});
exports.login = login;
const check = (req, res) => {
    const user = res.locals;
    console.log(user);
    const token = jsonwebtoken_1.default.sign({ email: user.email, password: user.password, role: user.role }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
};
exports.check = check;
