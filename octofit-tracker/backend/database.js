"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.MONGO_URI = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(exports.MONGO_URI);
        console.log('✓ MongoDB connected successfully');
    }
    catch (error) {
        console.error('✗ MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('✗ MongoDB disconnection error:', error);
        process.exit(1);
    }
};
exports.disconnectDB = disconnectDB;
//# sourceMappingURL=database.js.map