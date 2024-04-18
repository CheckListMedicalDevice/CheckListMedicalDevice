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
const device_model_1 = require("../models/device.model");
dotenv_1.default.config();
const createDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, machineType, location, code, actor, note, } = req.body;
        const data = {
            name,
            machineType,
            location,
            code,
            actor,
            note,
            createAt: new Date(),
            updateAt: new Date(),
        };
        const deviceCreate = yield device_model_1.Device.create(Object.assign({}, data));
        if (!deviceCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Create Device success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong " });
    }
});
const updateDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, machineType, location, code, actor, note, } = req.body;
        const updateDevice = yield device_model_1.Device.update({
            name,
            machineType,
            location,
            code,
            actor,
            note,
        }, {
            where: {
                id,
            }
        });
        return res.status(200).json({ mesage: "Update Success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to retrieve Device " });
    }
});
const getDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alldevices = yield device_model_1.Device.findAll();
        return res.status(200).json({
            total: alldevices.length,
            items: alldevices,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve Device",
        });
    }
});
const getDeviceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const device = yield device_model_1.Device.findByPk(id);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        return res.status(200).json(device);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve Device",
        });
    }
});
const deleteDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteDevice = yield device_model_1.Device.destroy({
            where: {
                id,
            }
        });
        yield deleteDevice.destroyer();
        return res.status(200).json({ message: "Delete Success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createDevice,
    updateDevice,
    getDevice,
    getDeviceById,
    deleteDevice,
};
