"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = void 0;
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus[TransactionStatus["Pending"] = 0] = "Pending";
    TransactionStatus[TransactionStatus["Successful"] = 1] = "Successful";
    TransactionStatus[TransactionStatus["Failed"] = 2] = "Failed";
    // Cancelled = 3
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
