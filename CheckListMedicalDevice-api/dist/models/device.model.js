"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.Device = database_1.sequelize.define("device", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "name",
    },
    machineType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "machineType",
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
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
    }
});
