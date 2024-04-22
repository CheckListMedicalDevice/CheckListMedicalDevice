"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tools_controller_1 = __importDefault(require("../controllers/tools.controller"));
const router = (0, express_1.Router)();
router.get("/gettools", tools_controller_1.default.getTools);
// router.get('/self', toolsController.self);
// router.put('/self', toolsController.updateToolsSelf)
router.post('/createTools', tools_controller_1.default.createTools);
router.get('/', tools_controller_1.default.getTools);
router.get('/:id', tools_controller_1.default.getToolsById);
router.put('/:id', tools_controller_1.default.updateTools);
router.delete("/:id", tools_controller_1.default.deleteTools);
exports.default = router;
