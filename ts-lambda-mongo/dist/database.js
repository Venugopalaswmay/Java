"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let conn = null;
const connectDatabase = async () => {
    if (conn == null) {
        console.log('Creating new database connection...');
        conn = await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/ts-lambda-mongo', {
            serverSelectionTimeoutMS: 5000
        });
        return conn;
    }
    console.log('Connection already established, reusing existing connection');
    return conn;
};
exports.connectDatabase = connectDatabase;
