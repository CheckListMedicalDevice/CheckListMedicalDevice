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
const dotenv_1 = __importDefault(require("dotenv"));
const fire_model_1 = require("../models/fire.model");
dotenv_1.default.config();
const createFireExtinguisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, location, actor, } = req.body;
        const data = {
            code,
            location,
            actor,
        };
        const fireCreate = yield fire_model_1.FireExtinguisher.create(Object.assign({}, data));
        if (!fireCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Create FireExtinguisher success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateFireExtinguisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { code, location, actor } = req.body;
        const updateUser = yield fire_model_1.FireExtinguisher.update({
            code,
            location,
            actor,
        }, {
            where: {
                id,
            },
        });
        console.log(updateUser);
        // if (!updateUser) {
        //   return res.status(404).json({ message: "Fail to update" });
        // }
        return res.status(200).json({ message: "Update success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getFireExtinguisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFireExtinguishers = yield fire_model_1.FireExtinguisher.findAll();
        return res.status(200).json({
            total: allFireExtinguishers.length,
            items: allFireExtinguishers,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to retrieve fire extinguisher data" });
    }
});
const getFireExtinguisherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fire = req.fire;
        const { id } = req.params;
        const findFireExingurisherById = yield fire_model_1.FireExtinguisher.findAll({
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
const deleteFireExtinguisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.fire;
        const deletedUser = yield fire_model_1.FireExtinguisher.findOne({
            where: { id },
        });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        yield deletedUser.destroy();
        return res.status(200).json({ message: "FireExtingGruisher deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createFireExtinguisher,
    updateFireExtinguisher,
    getFireExtinguisher,
    getFireExtinguisherById,
    deleteFireExtinguisher,
};
