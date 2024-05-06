"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const devicesection_model_1 = require("../models/devicesection.model");
const device_model_1 = require("../models/device.model");
const device_transection_model_1 = require("../models/device_transection.model");
const devicesection_transection_model_1 = require("../models/devicesection_transection.model");
function generateDeviceTransections() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findDevices = yield device_model_1.Device.findAll();
            if (findDevices.length === 0) {
                throw new Error("No devices found.");
            }
            const DeviceTransectionPromises = findDevices.map((device) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const Devicebill = yield device_transection_model_1.DeviceTransection.create({
                        name: device.dataValues.name,
                        machineType: device.dataValues.machineType,
                        location: device.dataValues.location,
                        code: device.dataValues.code,
                        status: device.dataValues.status,
                        statusActive: device.dataValues.statusActive,
                    });
                    if (!Devicebill) {
                        throw new Error("Error creating bill.");
                    }
                    const findDeviceSections = yield devicesection_model_1.DeviceSection.findAll({
                        where: {
                            deviceId: device.dataValues.id,
                        },
                    });
                    const DeviceSectionTransectionPromises = findDeviceSections.map((deviceSection) => __awaiter(this, void 0, void 0, function* () {
                        return yield devicesection_transection_model_1.DeviceSectionTransection.create({
                            sectionName: deviceSection.dataValues.sectionName,
                            deviceId: deviceSection.dataValues.deviceId,
                            ability: deviceSection.dataValues.ability,
                            status: deviceSection.dataValues.status,
                            statusActive: deviceSection.dataValues.statusActive,
                        });
                    }));
                    yield Promise.all(DeviceSectionTransectionPromises);
                }
                catch (error) {
                    throw new Error(`Error creating bill for device ${device.dataValues.id}: ${error.message}`);
                }
            }));
            yield Promise.all(DeviceTransectionPromises);
            console.log("Bills generated successfully for all devices.");
        }
        catch (error) {
            console.error("Error generating device transactions:", error);
        }
    });
}
const getDeviceBillsByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        const deviceId = req.device;
        const deviceSectionsCount = yield devicesection_model_1.DeviceSection.count({
            where: { deviceId },
        });
        const findBillsByDevice = yield devicesection_model_1.DeviceSection.findAll({
            where: {
                deviceId,
                createdAt: date ? date : { [sequelize_1.Op.ne]: null },
            },
            order: [["createdAt", "DESC"]],
            limit: deviceSectionsCount,
        });
        return res.status(200).json(findBillsByDevice);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getBillsDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDeviceTransections = yield devicesection_transection_model_1.DeviceSectionTransection.findAll();
        return res.status(200).json({
            total: allDeviceTransections.length,
            items: allDeviceTransections,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to retrieve device data" });
    }
});
const updateDeviceTransection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { deviceId, sectionName, ability, statusActive, status } = req.body;
        const updateDeviceSection = yield devicesection_transection_model_1.DeviceSectionTransection.update({
            deviceId,
            sectionName,
            ability,
            statusActive,
            status,
        }, {
            where: {
                id,
            },
            returning: true,
        });
        if (updateDeviceSection[0] === 0) {
            return res.status(404).json({ message: "Device transection not found" });
        }
        return res.status(200).json({ message: "Update success", data: updateDeviceSection[1][0] });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    generateDeviceTransections,
    getDeviceBillsByAdmin,
    getBillsDevice,
    updateDeviceTransection,
};
