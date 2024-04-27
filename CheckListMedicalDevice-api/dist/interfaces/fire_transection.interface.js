"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFireTransectionStatus = exports.IFireTransectionStatusActive = void 0;
var IFireTransectionStatusActive;
(function (IFireTransectionStatusActive) {
    IFireTransectionStatusActive[IFireTransectionStatusActive["EMPTY"] = 0] = "EMPTY";
    IFireTransectionStatusActive[IFireTransectionStatusActive["INACTIVE"] = 1] = "INACTIVE";
    IFireTransectionStatusActive[IFireTransectionStatusActive["ACTIVE"] = 2] = "ACTIVE";
})(IFireTransectionStatusActive || (exports.IFireTransectionStatusActive = IFireTransectionStatusActive = {}));
var IFireTransectionStatus;
(function (IFireTransectionStatus) {
    IFireTransectionStatus[IFireTransectionStatus["WAITING"] = 0] = "WAITING";
    IFireTransectionStatus[IFireTransectionStatus["SUCCESSFUL"] = 1] = "SUCCESSFUL";
})(IFireTransectionStatus || (exports.IFireTransectionStatus = IFireTransectionStatus = {}));
//   export interface ResponseAndFire extends Response {
//     fire?: IFireTransection;
//   }
//   export interface NextFunctionAndFire extends NextFunction {
//     fire?: IFireTransection;
//   }
