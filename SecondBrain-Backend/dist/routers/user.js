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
exports.userRouter = exports.JWT_USER_PASSWORD = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
exports.JWT_USER_PASSWORD = "this is the secret key";
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        yield db_1.userModel.create({
            email: email,
            password: password
        });
        res.status(200).json({
            message: "Singup Successful"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User Already Exist"
        });
    }
    console.log(`Email: ${email} Password: ${password}`);
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.userModel.findOne({
        email: email,
        password: password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
        }, exports.JWT_USER_PASSWORD);
        console.log(token);
        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
}));
