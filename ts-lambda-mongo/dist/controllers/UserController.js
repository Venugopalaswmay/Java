"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
const database_1 = require("../database");
class UserController {
    // Similar to @PostMapping
    static async createUser(req, res) {
        try {
            await (0, database_1.connectDatabase)();
            const user = new User_1.default(req.body);
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Could not create user' });
        }
    }
    // Similar to @GetMapping
    static async getUsers(req, res) {
        try {
            await (0, database_1.connectDatabase)();
            const users = await User_1.default.find();
            res.status(200).json(users);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Could not fetch users' });
        }
    }
}
exports.UserController = UserController;
