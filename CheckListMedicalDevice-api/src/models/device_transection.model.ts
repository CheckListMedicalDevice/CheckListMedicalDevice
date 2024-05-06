import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { IDeviceStatusActive, IDeviceTransectionStatus } from "../interfaces/device_transection";




export const DeviceTransection = sequelize.define("devicetransection", {
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
      statusActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: IDeviceStatusActive.EMPTY,
        field: "statusActive",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: IDeviceTransectionStatus.WAITING,
        field: "status",
      }
      
})