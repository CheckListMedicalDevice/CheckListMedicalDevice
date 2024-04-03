import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const TransectionItems = sequelize.define("transectionItems", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  transectionId: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "transectionId",
  },
  deviceItemId: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    field: "deviceItemId",
  },
  partName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "partName",
  },
  ability: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "ability",
  },
  already: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: "",
    field: "already",
  },
  
  
});
