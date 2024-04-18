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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const fire_route_1 = __importDefault(require("./routes/fire.route"));
const transection_route_1 = __importDefault(require("./routes/transection.route"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/users", user_route_1.default);
app.use("/fireExtinguisher", fire_route_1.default);
app.use("/transection", transection_route_1.default);
// app.use("/device", deviceRoutes)
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.sync();
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
}));
