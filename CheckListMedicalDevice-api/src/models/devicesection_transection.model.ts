import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { IDeviceSectionTransectionStatus, IDeviceSectionTransectionStatusActive } from "../interfaces/devicesection_transection.interface";




export const DeviceSectionTransection = sequelize.define("devicesectiontransection", {
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
      sectionName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "sectionName",
      },
      ability: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        field: "ability",
      },
      statusActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: IDeviceSectionTransectionStatusActive.EMPTY,
        field: "statusActive",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: IDeviceSectionTransectionStatus.WAITING,
        field: "status",
      }
      
})