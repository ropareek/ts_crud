"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const customers_routes_1 = require("../src/routes/customers.routes");
const products_routes_1 = require("../src/routes/products.routes");
// Db connection
mongoose_1.default.connect('mongodb://127.0.0.1:27017/ts_crud', () => {
    console.log('Db Connected');
});
// ----------------------
app.use('/customers', customers_routes_1.customerRouter);
app.use('/products', products_routes_1.productRouter);
// connecting to the server
app.listen(3008, () => {
    console.log('Server running on 3008');
});
// ---------------------------
//# sourceMappingURL=app.js.map