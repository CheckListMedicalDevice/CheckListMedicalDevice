"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireTransection = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const fire_transection_interface_1 = require("../interfaces/fire_transection.interface");
exports.FireTransection = database_1.sequelize.define("firetransection", {
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
    statusActive: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: fire_transection_interface_1.IFireTransectionStatusActive.EMPTY,
        field: "statusActive",
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: fire_transection_interface_1.IFireTransectionStatus.WAITING,
        field: "status",
    }
});
