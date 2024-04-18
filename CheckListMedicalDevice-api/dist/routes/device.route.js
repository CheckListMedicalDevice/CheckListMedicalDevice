"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_controller_1 = __importDefault(require("../controllers/device.controller"));
const router = (0, express_1.Router)();
router.post("/createDevice", device_controller_1.default.createDevice);
router.get("/getDevice", device_controller_1.default.getDevice);
router.get("/getDeviceById", device_controller_1.default.getDeviceById);
router.get("/", device_controller_1.default.getDevice);
router.get("/:id", device_controller_1.default.getDeviceById);
router.put("/:id", device_controller_1.default.updateDevice);
router.delete("/:id", device_controller_1.default.deleteDevice);
exports.default = router;
