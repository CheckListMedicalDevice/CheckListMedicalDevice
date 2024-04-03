"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = void 0;
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus[TransactionStatus["Pending"] = 0] = "Pending";
    TransactionStatus[TransactionStatus["successful"] = 1] = "successful";
    TransactionStatus[TransactionStatus["failed"] = 2] = "failed";
    // Cancelled = 3
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
//   export enum roleAdmin {
//     admin = "admin",
//     user = "user",
//   }
