"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@food-diary.xroqh.mongodb.net/?retryWrites=true&w=majority&appName=food-diary`;
const connectDb = () => {
    mongoose_1.default
        .connect(url)
        .then(() => {
        console.log('Connected with MongoDB!');
    })
        .catch((err) => {
        console.error('Connection failed!', err);
    });
};
exports.default = connectDb;
