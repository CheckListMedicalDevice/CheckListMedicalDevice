"use strict";
// import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../config/database";
// import { Tools } from "./tools.model";
// export const ToolsHistory = sequelize.define<Model>(
//   "toolsHistory",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     toolId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Tools,
//         key: "id",
//       },
//     },
//     prevCount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     newCount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     changeType: {
//       type: DataTypes.ENUM("ADD", "REMOVE"),
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   }
// );
