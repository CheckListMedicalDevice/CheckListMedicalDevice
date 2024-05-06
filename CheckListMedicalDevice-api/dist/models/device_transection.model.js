"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTransection = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const device_transection_1 = require("../interfaces/device_transection");
exports.DeviceTransection = database_1.sequelize.define("devicetransection", {
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
    statusActive: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: device_transection_1.IDeviceStatusActive.EMPTY,
        field: "statusActive",
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: device_transection_1.IDeviceTransectionStatus.WAITING,
        field: "status",
    }
});
