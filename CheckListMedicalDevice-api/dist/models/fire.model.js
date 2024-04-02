"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireExtinguisher = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.FireExtinguisher = database_1.sequelize.define("fireExtinguisher", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "code",
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "location",
    },
    actor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "actor",
    }
});
