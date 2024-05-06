"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDeviceTransectionStatus = exports.IDeviceStatusActive = void 0;
var IDeviceStatusActive;
(function (IDeviceStatusActive) {
    IDeviceStatusActive[IDeviceStatusActive["EMPTY"] = 0] = "EMPTY";
    IDeviceStatusActive[IDeviceStatusActive["INACTIVE"] = 1] = "INACTIVE";
    IDeviceStatusActive[IDeviceStatusActive["ACTIVE"] = 2] = "ACTIVE";
})(IDeviceStatusActive || (exports.IDeviceStatusActive = IDeviceStatusActive = {}));
var IDeviceTransectionStatus;
(function (IDeviceTransectionStatus) {
    IDeviceTransectionStatus[IDeviceTransectionStatus["WAITING"] = 0] = "WAITING";
    IDeviceTransectionStatus[IDeviceTransectionStatus["SUCCESSFUL"] = 1] = "SUCCESSFUL";
})(IDeviceTransectionStatus || (exports.IDeviceTransectionStatus = IDeviceTransectionStatus = {}));
