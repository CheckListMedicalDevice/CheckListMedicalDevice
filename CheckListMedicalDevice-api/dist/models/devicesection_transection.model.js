"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSectionTransection = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const devicesection_transection_interface_1 = require("../interfaces/devicesection_transection.interface");
exports.DeviceSectionTransection = database_1.sequelize.define("devicesectiontransection", {
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
    sectionName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "sectionName",
    },
    ability: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "ability",
    },
    statusActive: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: devicesection_transection_interface_1.IDeviceSectionTransectionStatusActive.EMPTY,
        field: "statusActive",
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: devicesection_transection_interface_1.IDeviceSectionTransectionStatus.WAITING,
        field: "status",
    }
});
