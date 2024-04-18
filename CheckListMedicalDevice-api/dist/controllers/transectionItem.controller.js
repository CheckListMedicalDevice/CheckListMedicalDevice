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
const transectionItems_model_1 = require("./../models/transectionItems.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createTransectionItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transectionId, deviceItemId, partName, ability, already } = req.body;
        const data = {
            deviceItemId,
            transectionId,
            partName,
            already,
            ability,
        };
        const transectionCreate = yield transectionItems_model_1.TransectionItems.create(data);
        if (!transectionCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Transection Created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateTransectionItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { transectionId, deviceItemId, partName, ability, already } = req.body;
        const updateTransection = yield transectionItems_model_1.TransectionItems.update({
            deviceItemId,
            transectionId,
            partName,
            already,
            ability,
        }, {
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "update success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deleteTransectionItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTransection = yield transectionItems_model_1.TransectionItems.destroy({
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "delete success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTransectionItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alltransection = yield transectionItems_model_1.TransectionItems.findAll();
        return res.status(200).json({
            total: alltransection.length,
            items: alltransection,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTransectionByIdItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fire = req.transection;
        const { id } = req.params;
        const findFireExingurisherById = yield transectionItems_model_1.TransectionItems.findAll({
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
exports.default = {
    createTransectionItems,
    updateTransectionItems,
    deleteTransectionItems,
    getTransectionItems,
    getTransectionByIdItems,
};