import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const DeviceSection = sequelize.define("deviceSection", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    deviceId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "deviceId",
    },
    sectionName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "sectionName",
    },
    ability: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "ability",
    },
   
   
    
})