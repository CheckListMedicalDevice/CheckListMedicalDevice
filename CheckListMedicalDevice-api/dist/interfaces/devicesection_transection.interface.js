"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDeviceSectionTransectionStatus = exports.IDeviceSectionTransectionStatusActive = void 0;
var IDeviceSectionTransectionStatusActive;
(function (IDeviceSectionTransectionStatusActive) {
    IDeviceSectionTransectionStatusActive[IDeviceSectionTransectionStatusActive["EMPTY"] = 0] = "EMPTY";
    IDeviceSectionTransectionStatusActive[IDeviceSectionTransectionStatusActive["INACTIVE"] = 1] = "INACTIVE";
    IDeviceSectionTransectionStatusActive[IDeviceSectionTransectionStatusActive["ACTIVE"] = 2] = "ACTIVE";
})(IDeviceSectionTransectionStatusActive || (exports.IDeviceSectionTransectionStatusActive = IDeviceSectionTransectionStatusActive = {}));
var IDeviceSectionTransectionStatus;
(function (IDeviceSectionTransectionStatus) {
    IDeviceSectionTransectionStatus[IDeviceSectionTransectionStatus["WAITING"] = 0] = "WAITING";
    IDeviceSectionTransectionStatus[IDeviceSectionTransectionStatus["SUCCESSFUL"] = 1] = "SUCCESSFUL";
})(IDeviceSectionTransectionStatus || (exports.IDeviceSectionTransectionStatus = IDeviceSectionTransectionStatus = {}));
