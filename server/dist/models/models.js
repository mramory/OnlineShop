"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
const User = db_1.sequelize.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: 'USER' }
});
const Basket = db_1.sequelize.define('basket', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
const Product = db_1.sequelize.define('product', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    price: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    img: { type: sequelize_1.DataTypes.STRING, allowNull: false }
});
const Basket_Product = db_1.sequelize.define('basket_product', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
User.hasOne(Basket);
Basket.belongsTo(User);
Basket.hasMany(Basket_Product);
Basket_Product.belongsTo(Basket);
Product.hasMany(Basket_Product);
Basket_Product.belongsTo(Product);
module.exports = {
    User,
    Basket,
    Product,
    Basket_Product
};
