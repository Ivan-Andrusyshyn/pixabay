"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_user_1 = require("../controller/user/get-user");
const create_user_1 = __importDefault(require("../controller/user/create-user"));
const update_user_1 = __importDefault(require("../controller/user/update-user"));
const delete_user_1 = __importDefault(require("../controller/user/delete-user"));
const user_1 = __importDefault(require("../validation/user"));
const validateFilter_1 = __importDefault(require("../middleware/validateFilter"));
const userRouter = (0, express_1.Router)();
userRouter.get('', get_user_1.getUsers);
userRouter.get('/:id', (0, user_1.default)('id'), validateFilter_1.default, get_user_1.getUserById);
userRouter.post('/add-user', (0, user_1.default)('name', 'email'), validateFilter_1.default, create_user_1.default);
userRouter.put('/change-user/:id', (0, user_1.default)('name', 'email', 'id'), validateFilter_1.default, update_user_1.default);
userRouter.delete('/delete-user/:id', (0, user_1.default)('id'), validateFilter_1.default, delete_user_1.default);
exports.default = userRouter;
