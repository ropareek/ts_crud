"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
    },
    ownerId: {
        type: String,
    },
    createdAt: {
        type: Date,
        // required: true,
    },
    updatedAt: {
        type: Date,
        // required: true,
    },
});
exports.Product = (0, mongoose_1.model)("Product", exports.ProductSchema);
//# sourceMappingURL=Product.js.map