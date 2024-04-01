"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.User = database_1.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "firstName",
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "lastName",
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "username",
    },
    hashPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "hashPassword",
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "email",
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "address",
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "phoneNumber",
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        field: "isAdmin",
    },
});
