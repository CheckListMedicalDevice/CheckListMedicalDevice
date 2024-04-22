import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Tools = sequelize.define('tools', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "name",
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "count",
        defaultValue: 0,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "note",
    }
})