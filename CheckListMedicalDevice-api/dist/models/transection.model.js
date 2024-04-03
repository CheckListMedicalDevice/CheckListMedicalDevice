"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transection = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.Transection = database_1.sequelize.define("transection", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    deviceId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "deviceId",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "name",
    },
    machineType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "machineType",
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "location",
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "code",
    },
    actor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "actor",
    },
    note: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "note",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        field: "status",
    },
});
