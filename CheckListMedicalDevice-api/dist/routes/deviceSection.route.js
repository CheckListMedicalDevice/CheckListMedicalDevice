"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_section_controller_1 = __importDefault(require("../controllers/device_section.controller"));
const router = (0, express_1.Router)();
router.post("/createDeviceSection/:id", device_section_controller_1.default.createDeviceSection);
router.get("/getDeviceSection", device_section_controller_1.default.getDeviceSection);
router.get("/getDeviceById", device_section_controller_1.default.getDeviceSectionById);
router.get("/list/:deviceId", device_section_controller_1.default.getDeviceSection);
router.get("/:id", device_section_controller_1.default.getDeviceSectionById);
router.put("/:id", device_section_controller_1.default.updateDeviceSection);
router.delete("/:id", device_section_controller_1.default.deleteDeviceSection);
exports.default = router;
