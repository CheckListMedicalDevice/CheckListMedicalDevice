"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const accessPermission_middleware_1 = __importDefault(require("../middlewares/accessPermission.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.default.register);
router.post("/login", user_controller_1.default.login);
router.get("/self", auth_middleware_1.default.authenticateToken, user_controller_1.default.self);
router.put("/self", auth_middleware_1.default.authenticateToken, user_controller_1.default.updateSelf);
router.put("/:id", auth_middleware_1.default.authenticateToken, accessPermission_middleware_1.default.accessPermission, user_controller_1.default.updateUser);
router.get("/", auth_middleware_1.default.authenticateToken, user_controller_1.default.getUsers);
//wait for update middleware
router.get('/:id', auth_middleware_1.default.authenticateToken, user_controller_1.default.getUserById);
//wait for update middleware
// router.get(
//   '/store/:id', 
//   authMiddleware.authenticateToken
//   ,userController.getUserByStoreId
// )
//for owner edit child 
router.delete("/:id", auth_middleware_1.default.authenticateToken, accessPermission_middleware_1.default.accessPermission, user_controller_1.default.deleteUser);
exports.default = router;
