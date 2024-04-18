
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const FireExtinguisher = sequelize.define("fireExtinguisher", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
      field: "code",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
      field: "location",
    },  
    actor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "actor",
    }
    
  });
  