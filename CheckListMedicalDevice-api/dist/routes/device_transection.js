"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_transection_controller_1 = __importDefault(require("../controllers/device_transection.controller"));
const router = (0, express_1.Router)();
router.get('/', device_transection_controller_1.default.getBillsDevice);
router.get('/getbillsDevice', device_transection_controller_1.default.getBillsDevice);
router.get('/generatetransections', device_transection_controller_1.default.generateDeviceTransections);
router.get('/getbillbyadmin', device_transection_controller_1.default.getDeviceBillsByAdmin);
router.put('/:id', device_transection_controller_1.default.updateDeviceTransection);
exports.default = router;
