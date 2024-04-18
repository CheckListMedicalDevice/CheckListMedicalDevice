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
const fire_model_1 = require("../models/fire.model");
const firetransection_model_1 = require("../models/firetransection.model");
function generateFireTransections() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findFire = yield fire_model_1.FireExtinguisher.findAll();
            if (!findFire) {
                throw new Error("No fireextingrusher found.");
            }
            console.log(findFire);
            const FireTransectionPromises = findFire.map((fire) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const bill = yield firetransection_model_1.FireTransection.create({
                        code: fire.dataValues.code,
                        location: fire.dataValues.location,
                        status: fire.dataValues.status,
                        statusActive: fire.dataValues.statusActive,
                    });
                    if (!bill) {
                        throw new Error("Error creating bill.");
                    }
                }
                catch (error) {
                    throw new Error(`Error creating bill for store ${fire.dataValues.id}: ${error.message}`);
                }
            }));
            yield Promise.all(FireTransectionPromises);
            console.log("Bills generated successfully for all stores.");
        }
        catch (error) {
            console.error("Error generating bills:", error);
        }
    });
}
exports.default = {
    generateFireTransections,
};
