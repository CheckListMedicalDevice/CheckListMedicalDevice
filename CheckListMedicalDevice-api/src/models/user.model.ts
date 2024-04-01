import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "firstName",
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "lastName",
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "username",
  },
  hashPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "hashPassword",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "email",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "address",
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "phoneNumber",
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: "isAdmin",
  },
  
});
