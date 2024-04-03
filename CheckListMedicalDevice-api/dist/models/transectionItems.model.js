"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransectionItems = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.TransectionItems = database_1.sequelize.define("transectionItems", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    transectionId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "transectionId",
    },
    deviceItemId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "deviceItemId",
    },
    partName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "partName",
    },
    ability: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "ability",
    },
    already: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: "",
        field: "already",
    },
});
