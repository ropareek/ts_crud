"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CustomerSchema = new mongoose_1.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    products: {
        type: Array()
    },
    status: {
        enum: ['active', 'inactive', 'banned']
    },
    token: {
        type: String
    }
});
exports.Customer = (0, mongoose_1.model)("Customer", exports.CustomerSchema);
//# sourceMappingURL=Customer.js.map