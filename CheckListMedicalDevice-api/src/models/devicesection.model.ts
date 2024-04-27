import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Device = sequelize.define("device", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    deviceId:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
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
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "status",
    },
   
    
})