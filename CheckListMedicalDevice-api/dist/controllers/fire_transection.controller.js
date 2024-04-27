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
const sequelize_1 = require("sequelize");
const fire_model_1 = require("../models/fire.model");
const firetransection_model_1 = require("../models/firetransection.model");
function generateFireTransections() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findFire = yield fire_model_1.FireExtinguisher.findAll();
            if (findFire.length === 0) {
                throw new Error("No fire extinguishers found.");
            }
            const FireTransectionPromises = findFire.map((fire) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const bill = yield firetransection_model_1.FireTransection.create({
                        code: fire.dataValues.code,
                        location: fire.dataValues.location,
                        note: fire.dataValues.note,
                        status: fire.dataValues.status,
                        statusActive: fire.dataValues.statusActive,
                    });
                    if (!bill) {
                        throw new Error("Error creating bill.");
                    }
                }
                catch (error) {
                    throw new Error(`Error creating bill for fire extinguisher ${fire.dataValues.id}: ${error.message}`);
                }
            }));
            yield Promise.all(FireTransectionPromises);
            console.log("Bills generated successfully for all fire extinguishers.");
        }
        catch (error) {
            console.error("Error generating fire transactions:", error);
        }
    });
}
const getBillsByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        const findLengthExtinguisher = yield fire_model_1.FireExtinguisher.count({
            where: { fireId: req.fire },
        });
        const findBillsByLand = yield fire_model_1.FireExtinguisher.findAll({
            where: {
                fireId: req.fire,
                createdAt: date ? date : { [sequelize_1.Op.ne]: null },
            },
            order: [["createdAt", "DESC"]],
            limit: findLengthExtinguisher,
        });
        return res.status(200).json(findBillsByLand);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getBillFireExtingruisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFireExtinguishers = yield firetransection_model_1.FireTransection.findAll();
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
const updateFireExtinguisherTransection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { code, location, note, statusActive, status } = req.body;
        const updateFireExtinguisher = yield firetransection_model_1.FireTransection.update({
            note,
            statusActive,
            status
        }, {
            where: {
                id,
            },
        });
        return res.status(200).json({ message: "Update success" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    generateFireTransections,
    getBillsByAdmin,
    getBillFireExtingruisher,
    updateFireExtinguisherTransection
};
