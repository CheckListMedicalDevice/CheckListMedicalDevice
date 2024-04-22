"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fire_controller_1 = __importDefault(require("../controllers/fire.controller"));
const router = (0, express_1.Router)();
router.post('/createFireExtinguisher', fire_controller_1.default.createFireExtinguisher);
router.get("/getFireExtinguisher", fire_controller_1.default.getFireExtinguisher);
router.get('/self', fire_controller_1.default.self);
router.get('/self', fire_controller_1.default.updateFireExtinguisherSelf);
router.get('/', fire_controller_1.default.getFireExtinguisher);
router.get('/:id', fire_controller_1.default.getFireExtinguisherById);
router.put('/:id', fire_controller_1.default.updateFireExtinguisher);
router.delete("/:id", fire_controller_1.default.deleteFireExtinguisher);
exports.default = router;
