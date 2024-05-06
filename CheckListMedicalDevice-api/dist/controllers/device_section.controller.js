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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const devicesection_model_1 = require("../models/devicesection.model");
dotenv_1.default.config();
const createDeviceSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sectionName, ability, } = req.body;
        const { id } = req.params;
        const data = {
            deviceId: id,
            sectionName,
            ability,
            createAt: new Date(),
            updateAt: new Date(),
        };
        const deviceCreate = yield devicesection_model_1.DeviceSection.create(Object.assign({}, data));
        if (!deviceCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Create Device success" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong can't create " });
    }
});
const updateDeviceSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { deviceId, sectionName, ability } = req.body;
        const updateDeviceSection = yield devicesection_model_1.DeviceSection.update({
            deviceId,
            sectionName,
            ability,
        }, {
            where: {
                id,
            },
        });
        return res.status(200).json({ mesage: "Update Success" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to retrieve DeviceSection " });
    }
});
const getDeviceSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alldeviceSections = yield devicesection_model_1.DeviceSection.findAll({ where: { deviceId: req.params.deviceId } });
        return res.status(200).json({
            total: alldeviceSections.length,
            items: alldeviceSections,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve DeviceSection",
        });
    }
});
const getDeviceSectionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const device = yield devicesection_model_1.DeviceSection.findByPk(id);
        if (!device) {
            return res.status(404).json({ message: "DeviceSection not found" });
        }
        return res.status(200).json(device);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve DeviceSectionById",
        });
    }
});
const deleteDeviceSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteDevice = yield devicesection_model_1.DeviceSection.destroy({
            where: {
                id,
            },
        });
        yield deleteDevice.destroyer();
        return res.status(200).json({ message: "Delete Success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createDeviceSection,
    updateDeviceSection,
    getDeviceSection,
    getDeviceSectionById,
    deleteDeviceSection,
};
