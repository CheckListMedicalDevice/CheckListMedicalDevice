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
const transection_model_1 = require("./../models/transection.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createTransection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deviceId, name, machineType, location, code, actor, note, status } = req.body;
        const parsedDeviceId = parseInt(deviceId, 10);
        const data = {
            deviceId: parsedDeviceId,
            name,
            machineType,
            location,
            code,
            actor,
            note,
            status,
        };
        const transectionCreate = yield transection_model_1.Transection.create(data);
        if (!transectionCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Transection Created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateTransection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { deviceId, name, machineType, location, code, actor, note, status } = req.body;
        const parsedDeviceId = parseInt(deviceId, 10);
        const updateTransection = yield transection_model_1.Transection.update({
            deviceId: parsedDeviceId,
            name,
            machineType,
            location,
            code,
            actor,
            note,
            status,
        }, {
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "update success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deleteTransection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTransection = yield transection_model_1.Transection.destroy({
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "delete success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTransection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alltransection = yield transection_model_1.Transection.findAll();
        return res.status(200).json({
            total: alltransection.length,
            items: alltransection,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTransectionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fire = req.transection;
        const { id } = req.params;
        const findFireExingurisherById = yield transection_model_1.Transection.findAll({
            where: {
                id,
            },
        });
        return res.status(200).json(findFireExingurisherById);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createTransection,
    updateTransection,
    deleteTransection,
    getTransection,
    getTransectionById,
};
