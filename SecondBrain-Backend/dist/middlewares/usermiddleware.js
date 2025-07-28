"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../routers/user");
function userMiddleware(req, res, next) {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, user_1.JWT_USER_PASSWORD);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        }
        else {
            res.status(403).json({
                message: "Invalid token"
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(403).json({
            message: "You are not signed in"
        });
    }
}
