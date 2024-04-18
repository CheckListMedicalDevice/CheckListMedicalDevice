import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { IFireTransectionStatus, IFireTransectionStatusActive } from "../interfaces/fire_transection.interface";


export const FireTransection = sequelize.define("firetransection", {
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
      statusActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: IFireTransectionStatusActive.EMPTY,
        field: "statusActive",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: IFireTransectionStatus.WAITING,
        field: "status",
      }
      
})