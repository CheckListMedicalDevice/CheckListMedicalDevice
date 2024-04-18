import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Device = sequelize.define("device", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "name",
    },
    machineType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "machineType",
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "location",
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "code",
    },
    actor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "actor",
    },
    note:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "note",
    }
})