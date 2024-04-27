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
Object.defineProperty(exports, "__esModule", { value: true });
const stockhistory_model_1 = require("../models/stockhistory.model");
const tools_model_1 = require("../models/tools.model");
// Middleware to record tool addition
const recordToolAddition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Record addition to tools_history table
        yield stockhistory_model_1.ToolsHistory.create({
            tool_id: req.tools.id,
            action: 'addition',
            count_change: req.body.count, // Assuming count is of type number
        });
        next();
    }
    catch (error) {
        console.error("Error recording tool addition:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
// Middleware to record tool deletion
const recordToolDeletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Record deletion to tools_history table
        yield stockhistory_model_1.ToolsHistory.create({
            tool_id: parseInt(req.params.id), // Assuming id is of type number
            action: 'deletion',
            count_change: -1, // Assuming deletion always reduces count by 1
        });
        next();
    }
    catch (error) {
        console.error("Error recording tool deletion:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
// Middleware to record tool update
const recordToolUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Record update to tools_history table
        const { id } = req.params;
        const { count } = req.body; // Assuming count is of type number
        const toolBeforeUpdate = yield tools_model_1.Tools.findByPk(parseInt(id)); // Assuming id is of type number
        const countChange = count - toolBeforeUpdate.count;
        yield stockhistory_model_1.ToolsHistory.create({
            tool_id: parseInt(id), // Assuming id is of type number
            action: 'update',
            count_change: countChange,
        });
        next();
    }
    catch (error) {
        console.error("Error recording tool update:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
