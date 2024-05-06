"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSection = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.DeviceSection = database_1.sequelize.define("deviceSection", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    deviceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "deviceId",
    },
    sectionName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "sectionName",
    },
    ability: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "ability",
    },
});
