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
exports.productRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const Product_1 = require("../models/Product");
const auth = require('../middleware/auth');
// Global Config
exports.productRouter = express_1.default.Router();
exports.productRouter.use(express_1.default.json());
// GET
exports.productRouter.get('/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const data = yield Product_1.Product.findById(_id);
        console.log('-------------data', data);
        res.send(data);
    }
    catch (error) {
        console.log('errror while getting Product', error);
        res.status(500).send(error);
    }
}));
// POST
exports.productRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, slug, status, ownerId } = req.body;
        console.log('--------body', req.body);
        const newProduct = new Product_1.Product({
            name, description, slug, status, ownerId
        });
        console.log('------newProduct', newProduct);
        newProduct.save();
        res.status(200).json(newProduct);
    }
    catch (error) {
        console.log('error while creating new Product', error);
        res.status(500).json({ error });
    }
}));
// PUT
exports.productRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const { name, description, slug, status, ownerId } = req.body;
        const isPresent = yield Product_1.Product.find({ _id });
        if (!isPresent)
            return res.json({ msg: "this id does not exists" });
        const updated = yield Product_1.Product.updateOne({ _id, name, description, slug, status, ownerId });
        console.log('---------updated', updated);
        res.send(200).json({ msg: 'product updated', updated });
    }
    catch (error) {
        console.log('error while creating new Product', error);
        res.status(500).json({ msg: `there occured an error: ${error}` });
    }
}));
// DELETE
exports.productRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    yield Product_1.Product.deleteOne({ _id }).catch((err) => {
        console.log(err);
    });
    res
        .status(200)
        .json({ msg: `document with id: ${_id} deleted from database` });
}));
//# sourceMappingURL=products.routes.js.map