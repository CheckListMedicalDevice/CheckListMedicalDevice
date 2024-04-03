import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Transection = sequelize.define("transection", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  deviceId: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "deviceId",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "name",
  },
  machineType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "machineType",
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
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
  note: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "note",
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    field: "status",
  },
  
});
