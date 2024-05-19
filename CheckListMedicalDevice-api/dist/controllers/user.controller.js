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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_interface_1 = require("../interfaces/user.interface");
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, password, email, address, phoneNumber, } = req.body;
        const exitUser = yield user_model_1.User.findOne({
            where: { username },
        });
        if (exitUser) {
            return res.status(400).json({
                message: `There is already a user named ${username}.`,
            });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const role = user_interface_1.roleAdmin.user;
        const data = {
            firstName,
            lastName,
            username,
            hashPassword,
            email,
            address,
            phoneNumber,
            role
        };
        const userCreate = yield user_model_1.User.create(Object.assign({}, data));
        if (!userCreate) {
            return res.status(404).json({ message: "Fail to register" });
        }
        if (!updateUser) {
            return res.status(404).json({ message: "Fail to register" });
        }
        return res.status(201).json({ message: "Create user success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const findUser = yield user_model_1.User.findOne({
            where: { username },
        });
        if (!findUser) {
            return res.status(400).json({
                message: `Password or Username Wrong.`,
            });
        }
        const passwordIsMatch = yield bcrypt_1.default.compare(password, findUser.dataValues.hashPassword);
        if (!passwordIsMatch) {
            return res.status(400).json({
                message: `Password or Username Wrong.`,
            });
        }
        const token = yield jsonwebtoken_1.default.sign({ id: String(findUser.dataValues.id) }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });
        return res.status(200).json({ token: token });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const self = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(req.user);
});
const updateSelf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { firstName, lastName, username, password, email, address, phoneNumber, } = req.body;
    const updateUser = yield user_model_1.User.update({
        firstName,
        username,
        password,
        lastName,
        email,
        address,
        phoneNumber,
    }, { where: { id: user.id } });
    if (!updateUser) {
        return res.status(404).json({ message: "Fail to update" });
    }
    return res.status(200).json({ message: "Update success" });
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { perPage = 10, page = 1, status } = req.query;
        const offset = (Number(page) - 1) * Number(perPage);
        const findUsersByLand = yield user_model_1.User.findAll({
            where: {
                id: { [sequelize_1.Op.ne]: user.id },
            },
            attributes: { exclude: ["hashPassword"] },
            limit: Number(perPage),
            offset: offset,
        });
        return res.status(200).json({
            page: Number(page),
            perPage: Number(perPage),
            total: findUsersByLand.length,
            items: findUsersByLand,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        const findUserById = yield user_model_1.User.findAll({
            where: {
                id,
            },
            attributes: { exclude: ["hashPassword"] },
        });
        return res.status(200).json(findUserById);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, address, phoneNumber, username, password, role } = req.body;
        const updateUser = yield user_model_1.User.update({
            username,
            password,
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            role
        }, {
            where: {
                id,
            },
        });
        // if (!updateUser) {
        //   return res.status(404).json({ message: "Fail to update" });
        // }
        return res.status(200).json({ message: "Update success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const deletedUser = yield user_model_1.User.findOne({
            where: { id },
        });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        yield deletedUser.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    register,
    login,
    self,
    updateSelf,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
