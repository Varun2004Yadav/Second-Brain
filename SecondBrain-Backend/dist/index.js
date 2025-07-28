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
exports.JWT_USER_PASSWORD = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermiddleware_1 = require("./middlewares/usermiddleware");
const db_1 = require("./db");
const db_2 = require("./db");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
exports.JWT_USER_PASSWORD = "this is the secret key";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.post("/api/v1/content", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        title,
        link,
        type,
        userId: req.userId,
        tags: []
    });
    return res.json({
        message: "Content Added"
    });
}));
app.get("/api/v1/content", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "email");
    res.json({
        content
    });
}));
app.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        userId: req.userId
    });
}));
app.post("/api/v1/brain/share", usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_2.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
        }
        const hash = (0, utils_1.random)(10);
        yield db_2.LinkModel.create({
            userId: req.userId,
            hash: hash,
        });
        res.json({
            message: `/share/${hash}`
        });
    }
    else {
        yield db_2.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed Link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_2.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect Input"
        });
        return;
    }
    //userId
    const content = yield db_1.ContentModel.find({
        userId: link.userId,
    });
    console.log(link);
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User Not found "
        });
    }
    res.json({
        email: user === null || user === void 0 ? void 0 : user.email,
        content: content
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/Second-Brain-app");
        app.listen(3000);
        console.log("Listening on Port 3000");
    });
}
main();
