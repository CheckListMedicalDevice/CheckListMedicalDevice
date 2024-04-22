"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tools = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.Tools = database_1.sequelize.define('tools', {
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
    count: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "count",
        defaultValue: 0,
    },
    note: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "note",
    }
});
