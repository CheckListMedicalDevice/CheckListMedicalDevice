"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transection_controller_1 = __importDefault(require("../controllers/transection.controller"));
const router = (0, express_1.Router)();
router.post("/createTransection", transection_controller_1.default.createTransection);
router.get("/getTransection", transection_controller_1.default.getTransection);
// router.get("/getTransectionById", transectionController.getTransectionById);
router.get("/", transection_controller_1.default.getTransection);
// router.get(
//     "/:id",
//     transectionController.getTransectionById
// );
router.put("/:id", transection_controller_1.default.updateTransection);
router.delete("/:id", transection_controller_1.default.deleteTransection);
exports.default = router;
