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
const tools_model_1 = require("../models/tools.model");
dotenv_1.default.config();
// const self = async (req: RequsetAndTools, res: Response) => {
//   return res.status(200).json(req.tools);
// };
const createTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, count, note, } = req.body;
        if (typeof count !== "number") {
            return res.status(400).json({
                message: `Count must be a number.`,
            });
        }
        const exitTools = yield tools_model_1.Tools.findOne({
            where: { name },
        });
        if (exitTools) {
            return res.status(400).json({
                message: `There is already a name ${name}.`,
            });
        }
        const data = {
            name,
            note,
            count,
        };
        const toolsCreate = yield tools_model_1.Tools.create(Object.assign({}, data));
        if (!toolsCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Create Tools success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTools = yield tools_model_1.Tools.findAll();
        return res.status(200).json({
            total: allTools.length,
            items: allTools,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "something went wrong",
        });
    }
});
const getToolsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findToolsById = yield tools_model_1.Tools.findByPk(id);
        return res.status(200).json(findToolsById);
    }
    catch (_a) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, note, count } = req.body;
        const updateTools = yield tools_model_1.Tools.update({
            name,
            note,
            count,
        }, {
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "Update Success " });
    }
    catch (error) {
        return res.status(500).json({ massage: "Something went wrong " });
    }
});
const updateToolsSelf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tools = req.tools;
    const { name, note, count, } = req.body;
});
const deleteTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tools = req.tools;
        const deleteTools = yield tools_model_1.Tools.findOne({
            where: {
                id,
            },
        });
        if (!deleteTools) {
            return res.status(404).json({
                message: "Tools Note found",
            });
        }
        yield (deleteTools === null || deleteTools === void 0 ? void 0 : deleteTools.destroy());
        return res.status(200).json({
            message: "Tools Deleted",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.default = {
    createTools,
    getTools,
    updateTools,
    deleteTools,
    //   self,
    updateToolsSelf,
    getToolsById,
};
