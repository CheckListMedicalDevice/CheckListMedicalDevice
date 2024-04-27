"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fire_transection_controller_1 = __importDefault(require("../controllers/fire_transection.controller"));
const router = (0, express_1.Router)();
router.get('/', fire_transection_controller_1.default.getBillFireExtingruisher);
router.get('/getbillfireextingruisher', fire_transection_controller_1.default.getBillFireExtingruisher);
router.get('/generatetransections', fire_transection_controller_1.default.generateFireTransections);
router.get('/getbillbyadmin', fire_transection_controller_1.default.getBillsByAdmin);
router.put('/:id', fire_transection_controller_1.default.updateFireExtinguisherTransection);
exports.default = router;
