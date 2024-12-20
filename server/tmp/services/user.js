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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = __importDefault(require("../db/user.schema"));
class UserService {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.find().sort({ _id: 1 });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findById(id);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Fetching user by email: ${email}`);
            try {
                return yield user_schema_1.default.findOne({ email });
            }
            catch (error) {
                console.error('Error fetching user by email:', error);
                throw new Error('Failed to fetch user by email');
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email, interest } = user;
            const existingUser = yield this.getUserByEmail(email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new user_schema_1.default({
                name,
                email,
                password: hashedPassword,
                interest,
            });
            try {
                return yield newUser.save();
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Failed to create user');
            }
        });
    }
    updateUser(id, name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_schema_1.default.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true });
                if (!updatedUser) {
                    throw new Error('User not found');
                }
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw new Error('Failed to update user');
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findByIdAndDelete(id);
                if (!user) {
                    throw new Error('User not found');
                }
                return id;
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw new Error('Failed to delete user');
            }
        });
    }
}
const userService = new UserService();
exports.default = userService;
