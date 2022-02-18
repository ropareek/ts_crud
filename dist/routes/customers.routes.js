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
exports.customerRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Customer_1 = require("../models/Customer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Global Config
exports.customerRouter = express_1.default.Router();
exports.customerRouter.use(express_1.default.json());
const saltRounds = 10;
// GET
exports.customerRouter.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Customer_1.Customer.find({});
        console.log('-------------data', data);
        res.send(data);
    }
    catch (error) {
        console.log('errror while getting', error);
        res.status(500).send(error);
    }
}));
// POST
exports.customerRouter.post('/signUp', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, products, status } = req.body;
        const newCustomer = new Customer_1.Customer({
            firstName, lastName, email, products, password, status
        });
        console.log('------newCustomer', newCustomer);
        bcrypt_1.default.hash(newCustomer.password, saltRounds, function (err, hash) {
            if (err)
                throw err;
            newCustomer.password = hash;
            newCustomer.save();
        });
        newCustomer.save()
            .then(() => {
            const token = jsonwebtoken_1.default.sign({
                firstName, email
            }, 'secretkey', {
                expiresIn: '2h'
            });
            newCustomer.token = token;
            console.log('--token', token);
            newCustomer.save();
        })
            .then((_customer) => {
            res.status(200).json({
                msg: `New Customer created`, newCustomer
            });
        });
    }
    catch (error) {
        console.log('error is', error);
        res.status(500).send(error);
    }
}));
// signIn
exports.customerRouter.post('/signIn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //find email in db
    Customer_1.Customer.find({ email }).then((customer) => {
        if (customer.length == 0) {
            res.json({ msg: `Customer with emailid: ${email} does not exist` });
        }
        const dbPass = customer[0].password;
        console.log(password, dbPass);
        bcrypt_1.default.compare(password, dbPass, function (err, isMatch) {
            if (err) {
                console.log(err);
                throw err;
            }
            if (isMatch) {
                console.log('loggedin', isMatch);
                //create token
                const token = jsonwebtoken_1.default.sign({
                    email,
                }, "secretkey", {
                    expiresIn: "2h",
                });
                res.json({ msg: "login successfull" });
            }
            else {
                console.log('not loggedin', isMatch);
                res.json({ msg: 'invalid credentials' });
            }
        });
    });
}));
//# sourceMappingURL=customers.routes.js.map